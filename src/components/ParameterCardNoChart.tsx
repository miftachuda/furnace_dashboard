import React from "react";
import { ParameterData } from "../types";
import {
  getParameterStatus,
  getStatusColor,
  formatNumber3,
  getTextColor,
  getBoxColor,
} from "../utils/helpers";
import StatusIndicator from "./StatusIndicator";

interface ParameterCardNoChartProps {
  parameter: ParameterData;
}

const ParameterCardNoChart: React.FC<ParameterCardNoChartProps> = ({
  parameter,
}) => {
  const status = getParameterStatus(parameter);

  return (
    <div
      className={`relative bg-gray-950 bg-opacity-40 rounded-lg p-4 border  border-slate-700 transition-all duration-300 hover:shadow-lg hover:border-slate-600 overflow-hidden`}
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

      <div className="flex justify-between items-start mt-2 mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-slate-200">{parameter.name}</h3>
        </div>
        <StatusIndicator status={status} pulse={status !== "normal"} />
      </div>

      <div className="flex items-baseline gap-1 mt-3">
        <span
          className={`text-3xl font-bold  transition-all duration-300 ${getTextColor(
            status
          )} `}
        >
          {formatNumber3(parameter.value)}
        </span>
        <span className="text-slate-400 text-sm">{parameter.unit}</span>
      </div>

      <div className="text-sm text-slate-100 font-bold mt-2">
        {parameter.description}
      </div>
    </div>
  );
};

export default ParameterCardNoChart;
