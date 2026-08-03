import { toast } from "sonner";

export async function share(title: string = "") {
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "UIT iMap - " + title,
        url,
      });
    } catch (err) {
      // Người dùng hủy chia sẻ
    }
  } else {
    // Fallback cho trình duyệt không hỗ trợ
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Đã sao chép đường dẫn!"))
      .catch(() =>
        toast.error("Không thể sao chép đường dẫn. Hãy thử lại sau!"),
      );
  }
}
