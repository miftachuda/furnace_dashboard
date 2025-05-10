import React, { useState, useRef, useEffect } from 'react';
import { ZoomControls } from './ZoomControls';
import { useZoom } from '../../hooks/useZoom';
import { usePan } from '../../hooks/usePan';

interface ZoomableCanvasProps {
  backgroundImage: string;
  children?: React.ReactNode;
}

export const ZoomableCanvas: React.FC<ZoomableCanvasProps> = ({ 
  backgroundImage,
  children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { 
    scale, 
    setScale, 
    handleZoomIn, 
    handleZoomOut, 
    handleZoomReset,
    handleWheelZoom
  } = useZoom();

  const {
    position,
    isPanning,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  } = usePan(scale);

  // Update transform when zoom or position changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
    }
  }, [scale, position]);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-neutral-900"
      ref={containerRef}
      onWheel={handleWheelZoom}
    >
      {/* Canvas content */}
      <div 
        ref={contentRef}
        className={`absolute origin-center transition-transform duration-75 w-full h-full
          ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          transformOrigin: 'center center',
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={backgroundImage} 
            alt="Background" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Child elements that maintain position */}
        {children}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 z-10">
        <ZoomControls
          scale={scale}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
        />
      </div>
    </div>
  );
};