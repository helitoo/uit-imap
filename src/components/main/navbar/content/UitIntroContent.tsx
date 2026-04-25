import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UitIntroContent() {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-main">
          Trường Đại học Công nghệ thông tin - ĐHQG-HCM
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed pr-4 text-justify">
          <img
            src="uit-20-years-logo.png"
            alt="UIT"
            className="w-1/3 mx-auto"
            draggable={false}
          />
          <p>
            <strong className="text-foreground">UIT</strong>{" "}
            <em>(University of Information technology - VNU-HCM)</em> là trường
            đại học công lập được thành lập ngày 08/06/2006 theo quyết định của
            Thủ tướng Chính phủ. Là trường thành viên của ĐHQG-HCM, UIT có nhiệm
            vụ đào tạo nguồn nhân lực ICT chất lượng cao, góp phần tích cực vào
            sự phát triển của nền khoa học Việt Nam, đồng thời tiến hành nghiên
            cứu khoa học và chuyển giao công nghệ thông tin tiên tiến, đặc biệt
            là hướng vào các ứng dụng nhằm góp phần đẩy mạnh sự nghiệp công
            nghiệp hóa, hiện đại hóa đất nước.
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
            <em>(Center for Information technology development - CITD)</em> là
            tiền thân của UIT, được thành lập ngày 28/11/1998. Năm 2006 thành
            lập trường Đại học Công nghệ thông tin và Trung tâm được tái thành
            lập thành trung tâm trực thuộc UIT có nhiệm vụ đào tạo các chương
            trình trực tuyến Cử nhân Đại học lĩnh vực Công nghệ thông tin và các
            chương trình không chính quy phục vụ cho nhiệm vụ đào tạo nguồn nhân
            lực Công nghệ Thông tin.
          </p>
          <p className="text-xs flex flex-col text-main">
            <a href="https://www.uit.edu.vn/" className="hover:underline">
              Trang web chính thức của UIT ↗
            </a>
            <a href="https://tuyensinh.uit.edu.vn/" className="hover:underline">
              Thông tin tuyển sinh Đại học UIT ↗
            </a>
            <a href="https://www.citd.edu.vn/" className="hover:underline">
              Trang web chính thức của CITD ↗
            </a>
          </p>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
