import { useRef, useEffect, useCallback } from "react";
import type { Hotspot } from "@/lib/types/hotspot";

interface HotspotDirectionProps {
  path: Hotspot[];
  modelViewerRef: React.RefObject<HTMLElement>;
}

interface CanvasPos {
  x: number;
  y: number;
}

export default function HotspotDirection({ path, modelViewerRef }: HotspotDirectionProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);

  const getHotspotPos = useCallback(
    (hotspot: Hotspot): CanvasPos | null => {
      const mv = modelViewerRef.current as (HTMLElement & {
        queryHotspot?: (name: string) => { canvasPosition: { x: number; y: number } } | null;
      }) | null;
      if (!mv?.queryHotspot) return null;
      const result = mv.queryHotspot(`hotspot-${hotspot.id}`);
      return result?.canvasPosition ?? null;
    },
    [modelViewerRef]
  );

  const drawLines = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Remove old lines
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    if (path.length < 2) return;

    for (let i = 0; i < path.length - 1; i++) {
      const posA = getHotspotPos(path[i]);
      const posB = getHotspotPos(path[i + 1]);
      if (!posA || !posB) continue;

      // Glow / shadow line
      const glow = document.createElementNS("http://www.w3.org/2000/svg", "line");
      glow.setAttribute("x1", String(posA.x));
      glow.setAttribute("y1", String(posA.y));
      glow.setAttribute("x2", String(posB.x));
      glow.setAttribute("y2", String(posB.y));
      glow.setAttribute("stroke", "rgba(239,68,68,0.3)");
      glow.setAttribute("stroke-width", "8");
      glow.setAttribute("stroke-linecap", "round");
      svg.appendChild(glow);

      // Main red line
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(posA.x));
      line.setAttribute("y1", String(posA.y));
      line.setAttribute("x2", String(posB.x));
      line.setAttribute("y2", String(posB.y));
      line.setAttribute("stroke", "#ef4444");
      line.setAttribute("stroke-width", "2.5");
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("stroke-dasharray", "6 4");
      svg.appendChild(line);
    }

    // Draw dots at each waypoint
    path.forEach((h, idx) => {
      const pos = getHotspotPos(h);
      if (!pos) return;

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", String(pos.x));
      circle.setAttribute("cy", String(pos.y));
      circle.setAttribute("r", idx === 0 || idx === path.length - 1 ? "6" : "4");
      circle.setAttribute("fill", idx === 0 ? "#22c55e" : idx === path.length - 1 ? "#ef4444" : "#ffffff");
      circle.setAttribute("stroke", "#ef4444");
      circle.setAttribute("stroke-width", "2");
      svg.appendChild(circle);
    });
  }, [path, getHotspotPos]);

  useEffect(() => {
    const loop = () => {
      drawLines();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawLines]);

  return (
    <svg
      ref={svgRef}
      className="direction-line-svg absolute inset-0 pointer-events-none z-10"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    />
  );
}
