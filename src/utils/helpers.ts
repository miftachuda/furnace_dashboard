import { ParameterData, ParameterStatus } from "../types";

export function getParameterStatus(parameter: ParameterData): ParameterStatus {
  if (parameter.value >= parameter.highThreshold) {
    return "danger";
  }

  if (parameter.value <= parameter.lowThreshold) {
    return "warning";
  }

  return "normal";
}

export function getStatusColor(status: ParameterStatus): string {
  switch (status) {
    case "danger":
      return "bg-red-500";
    case "warning":
      return "bg-amber-500";
    case "normal":
    default:
      return "bg-emerald-500";
  }
}

export function getStatusGradient(status: ParameterStatus): string {
  switch (status) {
    case "danger":
      return "from-red-500/20 to-red-500/5";
    case "warning":
      return "from-amber-500/20 to-amber-500/5";
    case "normal":
    default:
      return "from-emerald-500/20 to-emerald-500/5";
  }
}

export function formatNumber3(value: number | undefined | null): string {
  return value != null ? value.toFixed(3) : "0.000";
}

export function formatNumber2(value: number | undefined | null): string {
  return value != null ? value.toFixed(2) : "0.00";
}

export function formatNumber1(value: number | undefined | null): string {
  return value != null ? value.toFixed(1) : "0.0";
}

export function calculatePercentage(
  value: number,
  min: number,
  max: number
): number {
  const percentage = ((value - min) / (max - min)) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}
