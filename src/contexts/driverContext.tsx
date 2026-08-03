import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import driverObj, { steps, welcomeStep } from "@/lib/consts/driver";
import { useWeather } from "@/contexts/weatherContext";

interface DriverContextType {
  driver: typeof driverObj;
  start: () => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

function DriverGuideAnimation({ step }: { step: number }) {
  const container = document.getElementById("model-viewer");
  if (!container) return null;

  return createPortal(
    <div className="driver-guide-overlay pointer-events-none absolute inset-0 z-30 flex items-center justify-center select-none">
      {step === 0 && (
        <div className="relative flex h-16 w-48 items-center justify-center">
          <div className="absolute h-1 w-36 rounded-full bg-slate-800/50" />
          <div className="driver-guide-dot animate-driver-rotate-dot" />
        </div>
      )}

      {step === 1 && (
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute h-16 w-1 rounded-full bg-slate-800/50" />
          <div className="driver-guide-dot animate-driver-zoom-top" />
          <div className="driver-guide-dot animate-driver-zoom-bottom" />
        </div>
      )}

      {step === 2 && (
        <div className="relative flex h-16 w-48 items-center justify-center">
          <div className="absolute h-1 w-44 rounded-full bg-slate-800/50" />
          <div className="driver-guide-dot animate-driver-pan-dot1" />
          <div className="driver-guide-dot animate-driver-pan-dot2" />
        </div>
      )}
    </div>,
    container,
  );
}

export function DriverProvider({
  children,
  isLoading = false,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  const { loading: weatherLoading } = useWeather();
  const cleanupRef = useRef<(() => void) | null>(null);
  const [guideStep, setGuideStep] = useState<number | null>(null);
  const hasCheckedInitialVisit = useRef(false);

  const cleanupListeners = () => {
    setGuideStep(null);
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  };

  const handleStepHighlighted = (
    _element: Element | undefined,
    _step: any,
    opts: { state: { activeIndex?: number; popover?: any } },
  ) => {
    cleanupListeners();

    const title = _step?.popover?.title;
    let cameraStepIndex: number | null = null;
    if (title === "Xoay mô hình") {
      cameraStepIndex = 0;
    } else if (title === "Phóng to / Thu nhỏ") {
      cameraStepIndex = 1;
    } else if (title === "Di chuyển mô hình") {
      cameraStepIndex = 2;
    }

    const popoverDom = opts.state.popover?.wrapper;
    const getNextBtn = () =>
      (popoverDom?.querySelector(".driver-popover-next-btn") ||
        document.querySelector(
          ".driver-popover-next-btn",
        )) as HTMLButtonElement | null;

    // Only handle camera interaction steps for #model-viewer
    if (cameraStepIndex === null) {
      setGuideStep(null);
      const btn = getNextBtn();
      if (btn) {
        btn.disabled = false;
        btn.classList.remove("driver-popover-btn-disabled");
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      }
      return;
    }

    setGuideStep(cameraStepIndex);

    const nextBtn = getNextBtn();
    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.classList.add("driver-popover-btn-disabled");
      nextBtn.style.opacity = "0.5";
      nextBtn.style.pointerEvents = "none";
    }

    const enableNext = () => {
      setGuideStep(null);
      const btn = getNextBtn();
      if (btn) {
        btn.disabled = false;
        btn.classList.remove("driver-popover-btn-disabled");
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      }
    };

    const mv = document.querySelector("model-viewer") as any;
    if (!mv) {
      enableNext();
      return;
    }

    const initialOrbit = mv.getCameraOrbit ? mv.getCameraOrbit() : null;
    const initialTarget = mv.getCameraTarget ? mv.getCameraTarget() : null;
    let hasInteracted = false;

    const handleCameraChange = (e: any) => {
      if (hasInteracted) return;

      const source = e?.detail?.source;
      const isUserSource = source === "user-interaction";

      if (cameraStepIndex === 0) {
        // Step 0: Xoay mô hình (Rotate)
        const currentOrbit = mv.getCameraOrbit ? mv.getCameraOrbit() : null;
        let rotated = false;
        if (initialOrbit && currentOrbit) {
          const dTheta = Math.abs(currentOrbit.theta - initialOrbit.theta);
          const dPhi = Math.abs(currentOrbit.phi - initialOrbit.phi);
          if (dTheta > 0.005 || dPhi > 0.005) {
            rotated = true;
          }
        }
        if (isUserSource || rotated) {
          hasInteracted = true;
          enableNext();
        }
      } else if (cameraStepIndex === 1) {
        // Step 1: Phóng to / Thu nhỏ (Zoom)
        const currentOrbit = mv.getCameraOrbit ? mv.getCameraOrbit() : null;
        let zoomed = false;
        if (initialOrbit && currentOrbit) {
          const dRadius = Math.abs(currentOrbit.radius - initialOrbit.radius);
          if (dRadius > 0.01) {
            zoomed = true;
          }
        }
        if (isUserSource || zoomed) {
          hasInteracted = true;
          enableNext();
        }
      } else if (cameraStepIndex === 2) {
        // Step 2: Di chuyển mô hình (Move / Pan)
        const currentTarget = mv.getCameraTarget ? mv.getCameraTarget() : null;
        let panned = false;
        if (initialTarget && currentTarget) {
          const dX = Math.abs(currentTarget.x - initialTarget.x);
          const dY = Math.abs(currentTarget.y - initialTarget.y);
          const dZ = Math.abs(currentTarget.z - initialTarget.z);
          if (dX > 0.01 || dY > 0.01 || dZ > 0.01) {
            panned = true;
          }
        }
        if (isUserSource || panned) {
          hasInteracted = true;
          enableNext();
        }
      }
    };

    const handleWheel = () => {
      if (cameraStepIndex === 1 && !hasInteracted) {
        hasInteracted = true;
        enableNext();
      }
    };

    const handlePointerUp = () => {
      if (hasInteracted) {
        enableNext();
      }
    };

    mv.addEventListener("camera-change", handleCameraChange);
    mv.addEventListener("wheel", handleWheel);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);

    cleanupRef.current = () => {
      mv.removeEventListener("camera-change", handleCameraChange);
      mv.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  };

  useEffect(() => {
    const resetStepsToOriginal = () => {
      cleanupListeners();
      driverObj.setConfig({
        ...driverObj.getConfig(),
        steps,
      });
    };

    driverObj.setConfig({
      ...driverObj.getConfig(),
      onHighlighted: (element, step, opts) => {
        const progress = document.querySelector(
          ".driver-popover-progress-text",
        );
        if (progress) {
          const totalSteps =
            driverObj.getConfig()?.steps?.length ?? steps.length;
          progress.textContent = `${(opts.state.activeIndex ?? 0) + 1} / ${totalSteps}`;
        }
        handleStepHighlighted(element, step, opts);
      },
      onDestroyed: () => {
        resetStepsToOriginal();
      },
    });

    if (isLoading || weatherLoading || hasCheckedInitialVisit.current) {
      return;
    }

    hasCheckedInitialVisit.current = true;

    const haveVisited = localStorage.getItem("haveVisited");
    if (!haveVisited) {
      localStorage.setItem("haveVisited", "true");
      driverObj.setConfig({
        ...driverObj.getConfig(),
        steps: [welcomeStep, ...steps],
      });

      const timer = setTimeout(() => {
        driverObj.drive();
      }, 500);

      return () => {
        clearTimeout(timer);
        resetStepsToOriginal();
      };
    }

    return () => {
      cleanupListeners();
    };
  }, [isLoading, weatherLoading]);

  const start = useMemo(() => {
    return () => {
      driverObj.drive();
    };
  }, []);

  const value = useMemo(
    () => ({
      driver: driverObj,
      start,
    }),
    [start],
  );

  return (
    <DriverContext.Provider value={value}>
      {children}
      {guideStep !== null && <DriverGuideAnimation step={guideStep} />}
    </DriverContext.Provider>
  );
}

export function useDriver() {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error("useDriver must be used within a DriverProvider");
  }
  return context;
}
