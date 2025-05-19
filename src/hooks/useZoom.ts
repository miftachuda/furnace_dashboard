import { useState, useCallback } from "react";

export const useZoom = (initialScale = 1, minScale = 0.25, maxScale = 4) => {
  const [scale, setScale] = useState(initialScale);

  // Zoom in function - increases scale by 0.1 or to max
  const handleZoomIn = useCallback(() => {
    setScale((prevScale) => Math.min(prevScale + 0.02, maxScale));
  }, [maxScale]);

  // Zoom out function - decreases scale by 0.1 or to min
  const handleZoomOut = useCallback(() => {
    setScale((prevScale) => Math.max(prevScale - 0.02, minScale));
  }, [minScale]);

  // Reset zoom to initial scale
  const handleZoomReset = useCallback(() => {
    setScale(initialScale);
  }, [initialScale]);

  // Handle wheel zoom with Ctrl key
  const handleWheelZoom = useCallback(
    (e: React.WheelEvent) => {
      // Only zoom if Ctrl key is pressed
      if (e.ctrlKey) {
        e.preventDefault();

        // Determine zoom direction based on wheel delta
        const delta = e.deltaY > 0 ? -0.05 : 0.05;

        setScale((prevScale) => {
          const newScale = prevScale + delta;
          return Math.max(minScale, Math.min(newScale, maxScale));
        });
      }
    },
    [minScale, maxScale]
  );

  return {
    scale,
    setScale,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleWheelZoom,
  };
};
