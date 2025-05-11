import React, { useMemo } from "react";
import { ParameterData, ParameterStatus } from "../types";

interface MiniChartProps {
  parameter: ParameterData;
  status: ParameterStatus;
}

const MiniChart: React.FC<MiniChartProps> = ({ parameter, status }) => {
  const { history, highThreshold, lowThreshold } = parameter;

  const chartData = useMemo(() => {
    const max = Math.max(...history, highThreshold);
    const min = Math.min(...history, lowThreshold);
    const range = max - min;
    const padding = range * 0.1;
    const adjustedMax = max + padding;
    const adjustedMin = min - padding;
    const adjustedRange = adjustedMax - adjustedMin;

    return {
      points: history.map((value, i) => ({
        x: i * (100 / (history.length - 1)),
        y: 100 - ((value - adjustedMin) / adjustedRange) * 100,
      })),
      highLine: 100 - ((highThreshold - adjustedMin) / adjustedRange) * 100,
      lowLine: 100 - ((lowThreshold - adjustedMin) / adjustedRange) * 100,
    };
  }, [history, highThreshold, lowThreshold]);

  // Create smooth curve path
  const createSmoothPath = (points: { x: number; y: number }[]): string => {
    if (points.length < 2) return "";

    const path = [];
    path.push(`M ${points[0].x},${points[0].y}`);

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = (current.x + next.x) / 2;

      path.push(
        `C ${controlX},${current.y} ${controlX},${next.y} ${next.x},${next.y}`
      );
    }

    return path.join(" ");
  };

  // Create area path (for gradient fill)
  const createAreaPath = (points: { x: number; y: number }[]): string => {
    const smoothPath = createSmoothPath(points);
    return `${smoothPath} L ${points[points.length - 1].x},100 L ${
      points[0].x
    },100 Z`;
  };

  const smoothPath = createSmoothPath(chartData.points);
  const areaPath = createAreaPath(chartData.points);
  const strokeColor =
    status === "normal"
      ? "#10b981"
      : status === "warning"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="w-full h-16 relative mt-2">
      <div className={`absolute inset-0 rounded `}></div>

      {/* High threshold line */}
      <div
        className="absolute left-0 right-0 border-t border-red-600 z-10"
        style={{ top: `${chartData.highLine}%` }}
      />

      {/* Low threshold line */}
      <div
        className="absolute left-0 right-0 border-t border-amber-500 z-10"
        style={{ top: `${chartData.lowLine}%` }}
      />

      {/* Chart SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient
            id={`gradient-${parameter.id}`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gradient area fill */}
        <path
          d={areaPath}
          fill={`url(#gradient-${parameter.id})`}
          className="transition-all duration-300"
        />

        {/* Smooth line */}
        <path
          d={smoothPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default MiniChart;
