import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = "Đang tải bản đồ...",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center loading-bg">
      {/* Logo / Brand */}
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <img
            src="logo.png"
            alt="UIT iMAP logo"
            className="mx-auto w-1/2 object-contain"
            draggable={false}
          />
          {/* Ping rings */}
          <span className="absolute inset-0 rounded-2xl" />
        </div>

        {/* Loading cycle */}
        <Loader2 className="w-8 h-8 text-white animate-spin" />

        <p className="text-white/50 text-xs font-medium">{message}</p>
      </div>
    </div>
  );
}
