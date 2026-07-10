import { Hotspot } from "@/lib/types/hotspot";

export type TourLevel = {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
};

export type ViewParameters = {
  yaw: number;
  pitch: number;
  fov: number;
};

export type LinkHotspot = {
  yaw: number;
  pitch: number;
  rotation: number;
  target: string;
};

export type InfoHotspot = {
  yaw: number;
  pitch: number;
  title: string;
  text: string;
};

export type TourScene = {
  id: string;
  name: string;
  levels: TourLevel[];
  faceSize: number;
  initialViewParameters: ViewParameters;
  linkHotspots: LinkHotspot[];
  infoHotspots: InfoHotspot[];
};

export type MarzipanoScene = {
  data: TourScene;
  scene: {
    switchTo: () => void;
    hotspotContainer: () => {
      createHotspot: (
        element: HTMLElement,
        position: { yaw: number; pitch: number },
      ) => void;
    };
  };
  view: {
    setParameters: (parameters: TourScene["initialViewParameters"]) => void;
    offsetFov: (offset: number) => void;
  };
};

export type Tourspot = Hotspot & {
  sceneId: string;
};
