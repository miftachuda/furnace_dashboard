import React from "react";
import { ParameterData } from "../types";
import {
  getParameterStatus,
  formatNumber1,
  getStatusColor,
  getTextColor,
} from "../utils/helpers";
import StatusIndicator from "./StatusIndicator";
import { PercentageBar } from "./PercentBar";
import { param } from "framer-motion/client";

interface TubeSkinProps {
  parameter: ParameterData;
}

const TubeSkin: React.FC<TubeSkinProps> = ({ parameter }) => {
  const status = getParameterStatus(parameter);

  return (
    <div
      className={`relative bg-slate-800 rounded-lg p-2 border bg-opacity-50 border-slate-700 transition-all duration-300 hover:shadow-lg hover:border-slate-600 overflow-hidden w-36`}
    >
      <div
        className={`absolute top-0 right-0 left-0 h-3 ${getStatusColor(
          status
        )} ${
          ["bg-red-500", "bg-amber-500"].includes(getStatusColor(status))
            ? "animate-blink"
            : ""
        }`}
      />
      <div className="flex justify-between items-start mt-2 mb-0">
        <div className="flex items-center mr-2">
          <h3 className="font-medium text-slate-200">{parameter.id}</h3>
        </div>
        <StatusIndicator status={status} pulse={status !== "normal"} />
      </div>

      <div className="flex items-baseline gap-1 mt-0">
        <span
          className={`text-3xl font-bold text-slate-100 transition-all duration-300 ${getTextColor(
            status
          )} `}
        >
          {formatNumber1(parameter.value)}
        </span>
        <span className="text-slate-400 text-sm">{parameter.unit}</span>
      </div>
      <PercentageBar
        low={parameter.lowThreshold}
        real={parameter.value}
        max={parameter.highThreshold}
      />
    </div>
  );
};

export default TubeSkin;
