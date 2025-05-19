import React from "react";

type PercentageBarProps = {
  low: number;
  real: number;
  max: number;
};

export const PercentageBar: React.FC<PercentageBarProps> = ({
  low,
  real,
  max,
}) => {
  const totalRange = max - low;
  const realRelative =
    Math.max(0, Math.min((real - low) / totalRange, 1)) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-lg  h-6 relative overflow-hidden mt-3 p-1">
      {/* Highlighted Range */}
      <div
        className="bg-green-500 h-full transition-all"
        style={{ width: `${realRelative}%` }}
      />
      {/* Labels */}
    </div>
  );
};
