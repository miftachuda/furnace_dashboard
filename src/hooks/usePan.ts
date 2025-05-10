import { useState, useCallback, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export const usePan = (scale: number) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<Position | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  
  // Handle mouse down to start panning
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only use left mouse button
    if (e.button !== 0) return;
    
    setIsPanning(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);
  
  // Handle mouse move to calculate new position
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning || !startPosition) return;
    
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y
    });
  }, [isPanning, startPosition]);
  
  // Handle mouse up to stop panning
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setStartPosition(null);
  }, []);
  
  // Handle mouse leave to stop panning
  const handleMouseLeave = useCallback(() => {
    setIsPanning(false);
    setStartPosition(null);
  }, []);
  
  // Add keyboard event listeners for panning with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const panAmount = 30 / scale; // Adjust pan amount based on zoom level
      
      switch (e.key) {
        case 'ArrowUp':
          setPosition(prev => ({ ...prev, y: prev.y + panAmount }));
          break;
        case 'ArrowDown':
          setPosition(prev => ({ ...prev, y: prev.y - panAmount }));
          break;
        case 'ArrowLeft':
          setPosition(prev => ({ ...prev, x: prev.x + panAmount }));
          break;
        case 'ArrowRight':
          setPosition(prev => ({ ...prev, x: prev.x - panAmount }));
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scale]);
  
  return {
    position,
    isPanning,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  };
};