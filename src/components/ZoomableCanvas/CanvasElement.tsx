import React from "react";

interface CanvasElementProps {
  x: number; // X position in percentage (0-100)
  y: number; // Y position in percentage (0-100)
  children: React.ReactNode;
  className?: string;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  x,
  y,
  children,
  className = "",
}) => {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {children}
    </div>
  );
};
