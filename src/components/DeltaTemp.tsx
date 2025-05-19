import React from "react";
import { ParameterData } from "../types";
import {
  getParameterStatus,
  getStatusColor,
  formatNumber1,
  getTextColor,
  getBoxColor,
} from "../utils/helpers";
import StatusIndicator from "./StatusIndicator";

interface DeltaTempProps {
  parameter: ParameterData;
}

const DeltaTemp: React.FC<DeltaTempProps> = ({ parameter }) => {
  const status = getParameterStatus(parameter);

  return (
    <div
      className={`relative bg-gray-950 bg-opacity-50 rounded-lg p-2 border border-slate-700 transition-all duration-300 hover:shadow-lg hover:border-slate-600 overflow-hidden`}
    >
      <span
        className={`absolute inset-0 m-auto opacity-10 ${getBoxColor(
          status
        )}  z-0`}
      ></span>
      <div
        className={`absolute top-0 right-0 left-0 h-3 ${getStatusColor(
          status
        )} ${
          ["bg-red-500", "bg-amber-500"].includes(getStatusColor(status))
            ? "animate-blink"
            : ""
        }`}
      />

      <div className="flex justify-between items-start mt-4 mb-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-xl text-slate-200">
            {parameter.name}
          </h3>
        </div>
        <StatusIndicator status={status} pulse={status !== "normal"} />
      </div>

      <div className="flex items-baseline gap-1 mt-0">
        <span
          className={`text-3xl font-bold text-slate-100 transition-all duration-300 ${getTextColor(
            status
          )} `}
        >
          +{formatNumber1(parameter.value)}
        </span>
        <span className="text-slate-400 text-sm">{parameter.unit}</span>
      </div>

      <div className="mt-1 text-xs text-slate-400 flex justify-between">
        <span>
          Low: {parameter.lowThreshold}
          {parameter.unit}
        </span>
        <span>
          High: {parameter.highThreshold}
          {parameter.unit}
        </span>
      </div>
    </div>
  );
};

export default DeltaTemp;
