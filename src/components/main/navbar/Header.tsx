import { Info, MessageCircleQuestion, School } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-2 p-3 border-b border-border/40">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <img
          src="/logo.png"
          alt="UIT iMAP"
          className="w-9 h-9 object-contain rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Giới thiệu */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-muted-foreground hover:text-main hover:bg-main/10"
            title="Giới thiệu"
          >
            <Info className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-main">Giới thiệu UIT iMap</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-3 text-sm text-foreground/80 leading-relaxed pr-4 text-justify">
              <img src="logo.png" alt="UIT" className="w-1/2 mx-auto" />
              <p>
                <strong className="text-foreground">UIT iMAP</strong> là hệ
                thống bản đồ 3D trực tuyến dành cho Trường Đại học Công nghệ
                Thông tin – ĐHQG-HCM.
              </p>
              <p>
                Hệ thống cho phép sinh viên, giảng viên và khách tham quan dễ
                dàng tìm kiếm, khám phá các địa điểm trong khuôn viên trường bao
                gồm: phòng học, phòng máy, phòng lab, văn phòng khoa/bộ môn,
                căng tin, bãi xe và các khu vực tiện ích khác.
              </p>
              <p>
                Với giao diện 3D tương tác, người dùng có thể xoay, phóng to/thu
                nhỏ và khám phá toàn bộ khuôn viên từ nhiều góc độ khác nhau.
              </p>
              <p>
                Tính năng dẫn đường thông minh giúp tìm đường đi ngắn nhất giữa
                hai địa điểm bất kỳ, hỗ trợ cả định vị GPS để xác định vị trí
                hiện tại của người dùng.
              </p>

              <p className="text-xs text-muted-foreground border-t pt-3">
                Phát triển bởi sinh viên UIT • Phiên bản 1.0.0
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Hướng dẫn */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-muted-foreground hover:text-main hover:bg-main/10"
            title="Hướng dẫn"
          >
            <MessageCircleQuestion className="w-4 h-4" />
          </Button>
        </DialogTrigger>
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
                  <li>
                    Cuộn chuột hoặc chụm/giãn ngón tay để phóng to/thu nhỏ
                  </li>
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
                  <li>
                    Tick checkbox để hiển thị điểm đó trên bản đồ (tối đa 30)
                  </li>
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
                <h4 className="font-semibold text-foreground mb-1">
                  🧭 Dẫn đường
                </h4>
                <ul className="list-disc list-inside space-y-1 text-foreground/70">
                  <li>Nhấn "Dẫn đường" từ thông tin địa điểm</li>
                  <li>
                    Hệ thống tự động xác định vị trí hiện tại (cần cấp quyền
                    GPS)
                  </li>
                  <li>Chọn điểm đến và xem đường đi được vạch trên bản đồ</li>
                  <li>Nhấn "Thoát dẫn đường" để quay về chế độ thường</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Giới thiệu trường */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-muted-foreground hover:text-main hover:bg-main/10"
            title="UIT"
          >
            <School className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-main">
              Trường Đại học Công nghệ thông tin - ĐHQG-HCM
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-3 text-sm text-foreground/80 leading-relaxed pr-4 text-justify">
              <img
                src="uit-logo.jpg"
                alt="UIT"
                className="w-1/3 mx-auto"
                draggable={false}
              />
              <p>
                <strong className="text-foreground">UIT</strong>{" "}
                <em>(University of Information technology - VNU-HCM)</em> là
                trường đại học công lập được thành lập ngày 08/06/2006 theo
                quyết định của Thủ tướng Chính phủ. Là trường thành viên của
                ĐHQG-HCM, UIT có nhiệm vụ đào tạo nguồn nhân lực ICT chất lượng
                cao, góp phần tích cực vào sự phát triển của nền khoa học Việt
                Nam, đồng thời tiến hành nghiên cứu khoa học và chuyển giao công
                nghệ thông tin tiên tiến, đặc biệt là hướng vào các ứng dụng
                nhằm góp phần đẩy mạnh sự nghiệp công nghiệp hóa, hiện đại hóa
                đất nước.
              </p>
              <img
                src="citd-logo.jpg"
                alt="CITD"
                className="w-1/3 mx-auto"
                draggable={false}
              />
              <p>
                <strong className="text-foreground">
                  Trung tâm phát triển công nghệ thông tin
                </strong>{" "}
                <em>(Center for Information technology development - CITD)</em>{" "}
                là tiền thân của UIT, được thành lập ngày 28/11/1998. Năm 2006
                thành lập trường Đại học Công nghệ thông tin và Trung tâm được
                tái thành lập thành trung tâm trực thuộc UIT có nhiệm vụ đào tạo
                các chương trình trực tuyến Cử nhân Đại học lĩnh vực Công nghệ
                thông tin và các chương trình không chính quy phục vụ cho nhiệm
                vụ đào tạo nguồn nhân lực Công nghệ Thông tin.
              </p>
              <p className="text-xs flex flex-col text-main">
                <a href="https://www.uit.edu.vn/" className="hover:underline">
                  Trang web chính thức của UIT ↗
                </a>
                <a
                  href="https://tuyensinh.uit.edu.vn/"
                  className="hover:underline"
                >
                  Thông tin tuyển sinh Đại học UIT ↗
                </a>
                <a href="https://www.citd.edu.vn/" className="hover:underline">
                  Trang web chính thức của CITD ↗
                </a>
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
