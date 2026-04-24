import { Schedule } from "@/contexts/scheduleContext";
import { cn } from "@/lib/utils";
import { Clock, Users } from "lucide-react";

function formatTime(d: Date) {
  return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

const isBeforeNoon = (date: Date) => {
  return date.getHours() < 12;
};

export default function EventCell({
  schedule,
  className = "",
  style = {},
}: {
  schedule: Schedule;
  className?: string;
  style?: object;
}) {
  const {
    start,
    end,
    capacity,
    number_of_members,
    event_title,
    event_description,
  } = schedule;

  return (
    <div
      className={cn(
        "group relative flex gap-3 p-1 transition-all duration-200",
        "hover:bg-accent/30 cursor-default",
        "border-l-2",
        isBeforeNoon(start) ? "border-emerald-400" : "border-amber-400",
        className,
      )}
      style={style}
    >
      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <p
            className="text-sm font-semibold text-foreground leading-snug line-clamp-2"
            title={event_title}
          >
            {event_title}
          </p>
        </div>

        {/* Description */}
        {event_description && (
          <p
            className="text-xs text-muted-foreground line-clamp-3 leading-relaxed text-justify"
            title={event_description}
          >
            {event_description.replace("Giảng viên", "GV")}
          </p>
        )}

        {/* Meta row */}
        <div className="flex flex-col flex-wrap items-start gap-x-3 gap-y-1 mt-0.5">
          {/* Time */}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3 shrink-0" />
            {formatTime(start)} - {formatTime(end)}
          </span>

          {/* Capacity */}
          {number_of_members && (
            <span className="flex items-center gap-1 text-xs">
              <Users className="w-3 h-3 shrink-0" />
              {number_of_members}/{capacity}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
