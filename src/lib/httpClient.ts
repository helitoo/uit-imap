import { API_BASE_URL } from "@/lib/apiConfig";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  signal?: AbortSignal;
  timeout?: number;
  credentials?: RequestCredentials;
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: unknown,
    public url: string,
  ) {
    super(`HTTP ${status} ${statusText} - ${url}`);
    this.name = "HttpError";
  }
}

/**
 * Chế độ hoạt động của client, suy ra từ API_BASE_URL:
 * - "server":   backend thật (Docker inject domain khi build production)
 * - "jsdelivr": CDN tĩnh (mặc định khi KHÔNG build production)
 */
type ApiMode = "server" | "jsdelivr";

function detectApiMode(): ApiMode {
  try {
    const host = new URL(
      API_BASE_URL,
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost",
    ).hostname;

    if (/(^|\.)jsdelivr\.net$/i.test(host)) {
      return "jsdelivr";
    }
  } catch {
    // API_BASE_URL là relative path (vd "/api") -> không parse được domain tuyệt đối
    // => coi như đang gọi thẳng server của mình
  }
  return "server";
}

const API_MODE: ApiMode = detectApiMode();

/**
 * Khi ở chế độ jsdelivr (CDN tĩnh), gắn extension vào cuối đường dẫn API nếu chưa có:
 * - Route là "map" -> ".glb"
 * - Route thuộc "tiles" -> ".jpg"
 * - Còn lại -> ".json"
 */
function formatJsdelivrRoute(route: string): string {
  if (API_MODE !== "jsdelivr") return route;

  const match = route.match(/^([^?#]*)(.*)$/);
  if (!match) return route;

  let pathname = match[1];
  const searchAndHash = match[2];

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return route;

  const lastSegment = segments[segments.length - 1];
  const hasExtension = /\.[a-z0-9]+$/i.test(lastSegment);
  if (hasExtension) return route;

  const mainSegment = segments[0] === "api" ? segments[1] : segments[0];

  let ext = ".json";
  if (mainSegment === "map") {
    ext = ".glb";
  } else if (mainSegment === "tiles") {
    ext = ".jpg";
  } else if (mainSegment === "schedule") {
    ext = ".html";
  }

  pathname = `${pathname}${ext}`;
  return `${pathname}${searchAndHash}`;
}

function buildUrl(route: string, params?: RequestOptions["params"]): string {
  const formattedRoute = formatJsdelivrRoute(route);
  let cleanRoute = formattedRoute;
  const baseUrlEndsWithApi = /\/api\/?$/i.test(API_BASE_URL);
  if (baseUrlEndsWithApi) {
    cleanRoute = cleanRoute.replace(/^\/?api\//i, "/");
  }

  const path = cleanRoute.startsWith("/") ? cleanRoute : `/${cleanRoute}`;
  const url = new URL(
    `${API_BASE_URL.replace(/\/$/, "")}${path}`,
    typeof window !== "undefined" ? window.location.origin : undefined,
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Có nên tự động gắn Content-Type/Accept mặc định không?
 * - jsdelivr: chỉ phục vụ GET file tĩnh, không cần và không nên có header thừa
 *   (tránh preflight CORS / mismatch content-type khi trả file không phải JSON).
 * - server: bắt buộc có header cho mọi method, TRỪ PUT
 *   (PUT dùng để upload trực tiếp lên presigned URL, header lạ sẽ phá signature).
 */
function shouldAttachDefaultHeaders(method: HttpMethod): boolean {
  if (API_MODE === "jsdelivr") return false;
  if (method === "PUT") return false;
  return true;
}

/**
 * Credentials mặc định theo mode, caller vẫn override được qua options.credentials.
 */
function resolveCredentials(explicit?: RequestCredentials): RequestCredentials {
  if (explicit) return explicit;
  return API_MODE === "jsdelivr" ? "omit" : "same-origin";
}

async function parseResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (res.status === 204) {
    return undefined as T;
  }

  const data = isJson ? await res.json() : ((await res.text()) as unknown);

  if (!res.ok) {
    throw new HttpError(res.status, res.statusText, data, res.url);
  }

  return data as T;
}

async function request<T>(
  method: HttpMethod,
  route: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    headers,
    body,
    params,
    signal,
    timeout = 15000,
    credentials,
  } = options;

  const url = buildUrl(route, params);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort());
  }

  const isFormData = body instanceof FormData;

  // Header mặc định chỉ được gắn khi shouldAttachDefaultHeaders() cho phép.
  // Header do caller truyền tay (options.headers) LUÔN được giữ, kể cả ở PUT/jsdelivr,
  // để trường hợp đặc biệt (vd presigned PUT cần đúng 1 Content-Type cụ thể) vẫn hoạt động được.
  const finalHeaders: Record<string, string> = shouldAttachDefaultHeaders(
    method,
  )
    ? {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        Accept: "application/json",
        ...headers,
      }
    : { ...headers };

  try {
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? (body as FormData)
            : JSON.stringify(body),
      credentials: resolveCredentials(credentials),
      signal: controller.signal,
    });

    return await parseResponse<T>(res);
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new HttpError(0, "Request Timeout / Aborted", null, url);
    }
    throw new HttpError(0, "Network Error", err, url);
  } finally {
    clearTimeout(timeoutId);
  }
}

export const httpClient = {
  get: <T>(route: string, options?: Omit<RequestOptions, "body">) =>
    request<T>("GET", route, options),

  post: <T>(route: string, options?: RequestOptions) =>
    request<T>("POST", route, options),

  put: <T>(route: string, options?: RequestOptions) =>
    request<T>("PUT", route, options),

  patch: <T>(route: string, options?: RequestOptions) =>
    request<T>("PATCH", route, options),

  delete: <T>(route: string, options?: RequestOptions) =>
    request<T>("DELETE", route, options),

  head: <T>(route: string, options?: Omit<RequestOptions, "body">) =>
    request<T>("HEAD", route, options),

  request,
};
