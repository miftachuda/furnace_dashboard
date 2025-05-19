import React, { useState, useRef, useEffect } from "react";
import { ZoomControls } from "./ZoomControls";
import { useZoom } from "../../hooks/useZoom";
import { usePan } from "../../hooks/usePan";

interface ZoomableCanvasProps {
  backgroundImage: string;
  children?: React.ReactNode;
}

export const ZoomableCanvas: React.FC<ZoomableCanvasProps> = ({
  backgroundImage,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  const VIRTUAL_WIDTH = 2148;
  const VIRTUAL_HEIGHT = 1018;
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight; // Adjust height to fit the header
      const scaleX = vw / VIRTUAL_WIDTH;
      const scaleY = vh / VIRTUAL_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    window.addEventListener("resize", updateScale);
    updateScale();
    return () => window.removeEventListener("resize", updateScale);
  }, []);
  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(
        document.fullscreen ||
          (document as any).webkitFullscreen ||
          (document as any).mozFullScreen ||
          (document as any).msFullscreen
          ? true
          : false
      );
    };

    document.addEventListener("fullscreenchange", checkFullscreen);
    document.addEventListener("webkitfullscreenchange", checkFullscreen);
    document.addEventListener("mozfullscreenchange", checkFullscreen);
    document.addEventListener("MSFullscreenChange", checkFullscreen);

    checkFullscreen(); // check on mount

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
      document.removeEventListener("webkitfullscreenchange", checkFullscreen);
      document.removeEventListener("mozfullscreenchange", checkFullscreen);
      document.removeEventListener("MSFullscreenChange", checkFullscreen);
    };
  }, []);
  const {
    scale,
    setScale,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleWheelZoom,
  } = useZoom();

  const {
    position,
    isPanning,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handlePanReset,
  } = usePan(scale);

  // Update transform when zoom or position changes
  const handleReset = () => {
    handleZoomReset();
    handlePanReset();
  };
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
    }
  }, [scale, position]);

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black"
      onWheel={handleWheelZoom}
      style={{
        transform: `translate(0,${isFullscreen ? "12vh" : "3vh"})`,
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={``}
        style={{
          width: VIRTUAL_WIDTH,
          height: VIRTUAL_HEIGHT,

          position: "absolute",
        }}
      >
        {/* Fixed-resolution background */}
        <img
          src={backgroundImage}
          alt="Background"
          draggable={false}
          style={{
            width: VIRTUAL_WIDTH,
            height: VIRTUAL_HEIGHT,
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* Children placed by absolute coordinates (aligned perfectly) */}
        <div
          style={{
            width: VIRTUAL_WIDTH,
            height: VIRTUAL_HEIGHT,
            position: "absolute",
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "top left",
            top: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>

      {/* Zoom controls */}
      <div
        className="absolute top-14 right-4 z-10"
        style={{
          transform: "scale(0.60) translate(30%, -50%) ",
        }}
      >
        <ZoomControls
          scale={scale}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleReset}
        />
      </div>
    </div>
  );
};
