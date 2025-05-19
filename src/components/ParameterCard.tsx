import React from "react";
//import * as LucideIcons from "lucide-react";
import { ParameterData } from "../types";
import {
  getParameterStatus,
  getStatusColor,
  formatNumber3,
  getTextColor,
  getBoxColor,
} from "../utils/helpers";
import StatusIndicator from "./StatusIndicator";
import MiniChart from "./MiniChart";

interface ParameterCardProps {
  parameter: ParameterData;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ parameter }) => {
  const status = getParameterStatus(parameter);
  // const statusGradient = getStatusGradient(status);
  //const IconComponent = LucideIcons[parameter.icon as keyof typeof LucideIcons] || LucideIcons.Activity;
  //<IconComponent className="w-5 h-5 text-slate-400" />
  return (
    <div
      className={`relative   rounded-lg p-4 border bg-gray-950 bg-opacity-40 border-slate-700 transition-all duration-300 hover:shadow-lg hover:border-slate-600 overflow-hidden`}
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
          <h3 className="font-medium text-2xl text-slate-200">
            {parameter.name}
          </h3>
        </div>
        <StatusIndicator status={status} pulse={status !== "normal"} />
      </div>

      <div className="flex items-baseline gap-1 mt-3">
        <span
          className={`text-5xl font-bold  transition-all duration-300 ${getTextColor(
            status
          )} `}
        >
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

      <MiniChart parameter={parameter} status={status} />

      <div className="text-sm text-slate-100 font-bold mt-2">
        {parameter.description}
      </div>
    </div>
  );
};

export default ParameterCard;
