import { driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";

export const steps: DriveStep[] = [
  {
    element: "#model-viewer",
    popover: {
      title: "Xoay mô hình",
      description: "Xoay mô hình bằng 1 ngón tay hoặc rê chuột trái",
    },
  },
  {
    element: "#model-viewer",
    popover: {
      title: "Phóng to / Thu nhỏ",
      description:
        "Phóng to / Thu nhỏ bằng cách chụm 2 ngón tay hoặc dùng nút cuộn chuột",
    },
  },
  {
    element: "#model-viewer",
    popover: {
      title: "Di chuyển mô hình",
      description: "Di chuyển mô hình bằng 2 ngón tay hoặc rê chuột phải",
    },
  },
  {
    element: "#search-input",
    popover: {
      title: "Thanh tìm kiếm",
      description: "Tìm kiếm bất kỳ nơi nào trong khuôn viên UIT tại đây.",
    },
  },
  {
    element: "#direction-button",
    popover: {
      title: "Dẫn đường",
      description: "Click vào đây để vào chế độ dẫn đường.",
    },
  },
  {
    element: "#weather-bar",
    popover: {
      title: "Dự báo thời tiết",
      description: "Sắp tới tại UIT là mưa 🌧️ hay nắng ☀️ nhỉ?",
    },
  },

  {
    element: "#crowd-bar",
    popover: {
      title: "Độ đông đúc",
      description: "Không biết bây giờ có ai đang ở trường không ta 🤭?",
    },
  },
  {
    element: "#tour-button",
    popover: {
      title: "UIT 360",
      description: "Click vào đây để vào chế độ xem 360.",
    },
  },
  {
    element: "#toggle-screen-mode-button",
    popover: {
      title: "Thay đổi chế độ sáng / tối",
      description: "Trải nghiệm UIT iMap với nhiều chế độ giao diện khác nhau!",
    },
  },
  {
    element: "#driver-trigger",
    popover: {
      title: "Hướng dẫn",
      description: "Kích hoạt lại hướng dẫn này khi cần.",
    },
  },
  {
    element: "#imap-button",
    popover: {
      title: "Giới thiệu về trang web UIT iMap",
      description:
        "Khám phá không gian campus, các phòng ban, tiện ích và hơn thế nữa!",
    },
  },
  {
    element: "#uit-button",
    popover: {
      title: "Giới thiệu về UIT",
      description:
        "Xem thông tin chi tiết về trường Đại học Công nghệ thông tin (UIT) và các kênh truyền thống chính thức tại đây!",
    },
  },
  {
    element: "#schedule-button",
    popover: {
      title: "Lịch",
      description: "Xem các sự kiện đang diễn ra trong khuôn viên UIT.",
    },
  },
  {
    element: "#transport-button",
    popover: {
      title: "Tuyến xe và Di chuyển",
      description:
        "Xem các tuyến xe bus/metro kết nối UIT với khu vực xung quanh.",
    },
  },
];

export const welcomeStep: DriveStep = {
  popover: {
    title: "Chào mừng bạn đến với UIT iMap",
    description:
      "Nhấn vào nút Tiếp theo / Quay lại (hoặc các phím mũi tên ❮ / ❯) để xem hướng dẫn.",
  },
};

const driverObj = driver({
  nextBtnText: "Tiếp theo",
  prevBtnText: "Quay lại",
  doneBtnText: "Hoàn thành",
  steps,
});

export default driverObj;
