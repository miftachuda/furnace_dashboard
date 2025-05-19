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
    <div className="w-full bg-gray-200 rounded-lg h-6 relative overflow-hidden mt-3">
      {/* Full-width gradient */}
      <div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          background: "linear-gradient(to right, yellow, red)",
          zIndex: 0,
        }}
      />

      {/* Overlay to hide part of the gradient */}
      <div
        className="absolute top-0 right-0 h-full bg-gray-200 transition-all"
        style={{
          width: `${100 - realRelative}%`,
          zIndex: 1,
        }}
      />
    </div>
    //   <div className="w-full bg-gray-200 rounded-lg h-6 relative overflow-hidden mt-3">
    //     {/* Dynamic red bar */}
    //     <div
    //       className="absolute top-0 left-0 h-full transition-all rounded-lg"
    //       style={{
    //         width: `${realRelative}%`,
    //         backgroundColor: `rgb(255, ${255 - realRelative * 2.55}, ${
    //           255 - realRelative * 2.55
    //         })`,
    //         zIndex: 0,
    //       }}
    //     />
    //   </div>
  );
};
