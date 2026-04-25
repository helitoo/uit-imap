import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WebDirectContent() {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-main">Hướng dẫn sử dụng</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-4 text-sm pr-4 text-justify">
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              🗺️ Điều hướng bản đồ
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li>Kéo để xoay bản đồ 3D</li>
              <li>Cuộn chuột hoặc chụm/giãn ngón tay để phóng to/thu nhỏ</li>
              <li>Click đúp để căn giữa góc nhìn</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              🔍 Tìm kiếm địa điểm
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li>Nhấn vào biểu tượng kính lúp để mở thanh tìm kiếm</li>
              <li>Nhập tên phòng, tòa nhà hoặc từ khóa</li>
              <li>Lọc theo loại địa điểm, tầng, sức chứa</li>
              <li>Tick checkbox để hiển thị điểm đó trên bản đồ (tối đa 30)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              📍 Xem thông tin địa điểm
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li>Click vào điểm trên bản đồ để xem chi tiết</li>
              <li>Dùng nút "Chia sẻ" để sao chép đường dẫn</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">🧭 Dẫn đường</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li>Nhấn "Dẫn đường" từ thông tin địa điểm</li>
              <li>
                Hệ thống tự động xác định vị trí hiện tại (cần cấp quyền GPS)
              </li>
              <li>Chọn điểm đến và xem đường đi được vạch trên bản đồ</li>
              <li>Nhấn "Thoát dẫn đường" để quay về chế độ thường</li>
            </ul>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
