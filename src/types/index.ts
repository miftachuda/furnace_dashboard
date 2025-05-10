export interface ParameterData {
  id: string;
  name: string;
  value: number;
  unit: string;
  lowThreshold: number;
  highThreshold: number;
  history: number[];
  icon: string;
  description: string;
}

export type ParameterStatus = "normal" | "warning" | "danger";

export interface ParameterContextType {
  parameters: Record<string, ParameterData>;
  updateParameter: (id: string, value: number) => void;
}
