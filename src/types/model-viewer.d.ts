/// <reference types="react" />

interface ModelViewerElement extends HTMLElement {
  cameraOrbit: string;
  fieldOfView: string;
  cameraTarget: string;
  resetTurntableRotation(deg?: number): void;
  jumpCameraToGoal(): void;
  queryHotspot(name: string): {
    canvasPosition: { x: number; y: number };
    worldPosition: { x: number; y: number; z: number };
  } | null;
  getBoundingClientRect(): DOMRect;
}

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean | "";
        ar?: boolean | "";
        "ar-modes"?: string;
        "camera-orbit"?: string;
        "field-of-view"?: string;
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        "shadow-intensity"?: string;
        "tone-mapping"?: string;
        exposure?: string;
        poster?: string;
        autoplay?: boolean | "";
        "environment-image"?: string;
        "interaction-prompt"?: string;
        "touch-action"?: string;
        style?: React.CSSProperties;
        id?: string;
        ref?: React.Ref<ModelViewerElement>;
      },
      ModelViewerElement
    >;
  }
}
