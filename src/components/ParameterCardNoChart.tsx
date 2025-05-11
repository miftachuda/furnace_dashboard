import React from "react";
import { ParameterData } from "../types";
import {
  getParameterStatus,
  getStatusColor,
  formatNumber3,
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
      className={`relative bg-slate-800 rounded-lg p-4 border bg-opacity-45 border-slate-700 transition-all duration-300 hover:shadow-lg hover:border-slate-600 overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 left-0 h-1 ${getStatusColor(
          status
        )}`}
      ></div>

      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-slate-200">{parameter.name}</h3>
        </div>
        <StatusIndicator status={status} pulse={status !== "normal"} />
      </div>

      <div className="flex items-baseline gap-1 mt-3">
        <span className="text-3xl font-bold text-slate-100 transition-all duration-300">
          {formatNumber3(parameter.value)}
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

      <div className="text-sm text-slate-100 font-bold mt-2">
        {parameter.description}
      </div>
    </div>
  );
};

export default ParameterCardNoChart;
