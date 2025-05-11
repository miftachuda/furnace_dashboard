import React from "react";
import { ParameterStatus } from "../types";
import { getStatusColor } from "../utils/helpers";

interface StatusIndicatorProps {
  status: ParameterStatus;
  pulse?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  pulse = false,
}) => {
  const baseClasses = "w-3 h-3 rounded-full";
  const colorClass = getStatusColor(status);
  const pulseClass = pulse && status !== "normal" ? "animate-pulse" : "";

  return (
    <div className={`flex h-[1.5vh] w-[1.5vh] items-center justify-center`}>
      <span
        className={`animate-ping absolute inline-flex ${baseClasses} rounded-full ${colorClass} opacity-75`}
      ></span>
      <span
        className={`relative inline-flex rounded-full ${baseClasses} ${colorClass}`}
      ></span>
    </div>
    // <div className={`${baseClasses} ${colorClass} ${pulseClass}`}></div>
  );
};

export default StatusIndicator;
