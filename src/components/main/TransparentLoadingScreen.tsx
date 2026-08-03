import { Loader2 } from "lucide-react";

interface TransparentLoadingScreenProps {
  message?: string;
}

export default function TransparentLoadingScreen({
  message,
}: TransparentLoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/30 backdrop-blur-md pointer-events-auto select-none">
      <Loader2 className="w-10 h-10 text-white animate-spin drop-shadow-md" />
      {message && (
        <p className="mt-3 text-white/90 text-sm font-medium drop-shadow">{message}</p>
      )}
    </div>
  );
}
