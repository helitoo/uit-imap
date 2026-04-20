import { MapPin } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Đang tải bản đồ..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center loading-bg">
      {/* Logo / Brand */}
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl">
            <MapPin className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          {/* Ping rings */}
          <span className="absolute inset-0 rounded-2xl animate-ping bg-white/20" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-black text-white tracking-tight mb-1">
            UIT <span className="text-supporting">iMAP</span>
          </h1>
          <p className="text-white/60 text-sm font-medium">
            Bản đồ 3D trực tuyến – ĐH Công nghệ Thông tin
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full animate-[loading_1.5s_ease-in-out_infinite]"
            style={{
              animation: "loading 1.5s ease-in-out infinite",
            }}
          />
        </div>

        <p className="text-white/50 text-xs font-medium">{message}</p>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
