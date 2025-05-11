import React from "react";
import { ParameterData } from "../types";
import {
  getParameterStatus,
  getStatusColor,
  formatNumber1,
} from "../utils/helpers";
import StatusIndicator from "./StatusIndicator";

interface ParamCardMiniProps {
  parameter: ParameterData;
}

const ParamCardMini: React.FC<ParamCardMiniProps> = ({ parameter }) => {
  const status = getParameterStatus(parameter);

  return (
    <div
      className={`relative bg-slate-800 rounded-lg p-2 border bg-opacity-50 border-slate-700 transition-all duration-300 hover:shadow-lg hover:border-slate-600 overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 left-0 h-1 ${getStatusColor(
          status
        )}`}
      ></div>

      <div className="flex justify-between items-start mb-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-slate-200">{parameter.name}</h3>
        </div>
        <StatusIndicator status={status} pulse={status !== "normal"} />
      </div>

      <div className="flex items-baseline gap-1 mt-0">
        <span className="text-3xl font-bold text-slate-100 transition-all duration-300">
          {formatNumber1(parameter.value)}
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

export default ParamCardMini;
