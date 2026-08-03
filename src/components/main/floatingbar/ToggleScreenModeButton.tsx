import { useScreenMode } from "@/contexts/screenModeContext";
import { cn } from "@/lib/utils";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ToggleScreenModeButton({
  className = "",
}: {
  className?: string;
}) {
  const { screenMode, toggleScreenMode } = useScreenMode();

  const renderIcon = () => {
    switch (screenMode) {
      case "light":
        return <Sun className="size-5" />;
      case "dark":
        return <Moon className="size-5" />;
      case "system":
      default:
        return <Monitor className="size-5" />;
    }
  };

  const getTitle = () => {
    switch (screenMode) {
      case "light":
        return "Chuyển sang chế độ Tối";
      case "dark":
        return "Chuyển sang chế độ Theo hệ thống";
      case "system":
      default:
        return "Chuyển sang chế độ Sáng";
    }
  };

  return (
    <button
      id="toggle-screen-mode-button"
      onClick={toggleScreenMode}
      className={cn("btn-floating-bar", className)}
      title={getTitle()}
      aria-label={getTitle()}
    >
      {renderIcon()}
    </button>
  );
}
