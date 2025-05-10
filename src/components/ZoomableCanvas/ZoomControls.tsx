import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
  onZoomReset
}) => {
  // Format scale as percentage
  const scalePercentage = Math.round(scale * 100);

  return (
    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 text-gray-700">
      <button
        onClick={onZoomOut}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut size={18} />
      </button>
      
      <div className="min-w-16 text-center text-sm font-medium">
        {scalePercentage}%
      </div>
      
      <button
        onClick={onZoomIn}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn size={18} />
      </button>
      
      <div className="w-px h-6 bg-gray-200 mx-1"></div>
      
      <button
        onClick={onZoomReset}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Reset zoom"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
};