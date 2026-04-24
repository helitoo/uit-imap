import type { Schedule } from "@/lib/types/schedule";
import { parseTabTable } from "@/lib/helpers/schedule/parseTabTable";

export async function fetchSchedules(): Promise<Schedule[]> {
  const response = await fetch("/api/uit/lichphong");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch schedule: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  const schedules: Schedule[] = [];

  // Each building tab has id like "tab_A", "tab_B", "tab_C", …
  doc.querySelectorAll<HTMLElement>('[id^="tab_"]').forEach((tab) => {
    const tabId = tab.getAttribute("id") ?? "";
    const buildingId = tabId.replace("tab_", "");
    const table = tab.querySelector("table");
    if (table) schedules.push(...parseTabTable(table, buildingId));
  });

  return schedules;
}
