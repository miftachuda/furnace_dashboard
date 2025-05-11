import { ParameterData } from '../types';

export const COLORS = {
  background: '#0f172a', // slate-900
  card: '#1e293b', // slate-800
  cardHover: '#334155', // slate-700
  primary: '#3b82f6', // blue-500
  secondary: '#a855f7', // purple-500
  accent: '#f97316', // orange-500
  success: '#10b981', // emerald-500
  warning: '#f59e0b', // amber-500
  danger: '#ef4444', // red-500
  text: {
    primary: '#f8fafc', // slate-50
    secondary: '#cbd5e1', // slate-300
    muted: '#64748b', // slate-500
  },
};

export const initialParameterData: Record<string, ParameterData> = {
  tempInlet: {
    id: 'tempInlet',
    name: 'Temperature Inlet',
    value: 450,
    unit: '°C',
    lowThreshold: 400,
    highThreshold: 550,
    history: Array(20).fill(0).map(() => Math.random() * 150 + 400),
    icon: 'thermometer',
    description: 'Temperature of inlet flow',
  },
  tempOutlet: {
    id: 'tempOutlet',
    name: 'Temperature Outlet',
    value: 650,
    unit: '°C',
    lowThreshold: 580,
    highThreshold: 720,
    history: Array(20).fill(0).map(() => Math.random() * 140 + 600),
    icon: 'thermometer',
    description: 'Temperature of outlet flow',
  },
  tempDiff: {
    id: 'tempDiff',
    name: 'Temperature Difference',
    value: 200,
    unit: '°C',
    lowThreshold: 150,
    highThreshold: 250,
    history: Array(20).fill(0).map(() => Math.random() * 100 + 150),
    icon: 'arrow-up-down',
    description: 'Temperature differential',
  },
  tsrf: {
    id: 'tsrf',
    name: 'TSRF',
    value: 85.5,
    unit: 'tons',
    lowThreshold: 70,
    highThreshold: 95,
    history: Array(20).fill(0).map(() => Math.random() * 25 + 70),
    icon: 'fuel',
    description: 'Ton standard refinery fuel',
  },
  tempBridgewall: {
    id: 'tempBridgewall',
    name: 'Temperature Bridgewall',
    value: 890,
    unit: '°C',
    lowThreshold: 820,
    highThreshold: 950,
    history: Array(20).fill(0).map(() => Math.random() * 130 + 820),
    icon: 'flame',
    description: 'Temperature at bridgewall',
  },
  oxygenExcess: {
    id: 'oxygenExcess',
    name: 'Oxygen Excess',
    value: 3.8,
    unit: '%',
    lowThreshold: 2,
    highThreshold: 5,
    history: Array(20).fill(0).map(() => Math.random() * 3 + 2),
    icon: 'wind',
    description: 'Oxygen excess level',
  },
  stackTemp: {
    id: 'stackTemp',
    name: 'Stack Temperature',
    value: 310,
    unit: '°C',
    lowThreshold: 280,
    highThreshold: 350,
    history: Array(20).fill(0).map(() => Math.random() * 70 + 280),
    icon: 'arrow-up-from-line',
    description: 'Temperature at stack',
  },
  capacity: {
    id: 'capacity',
    name: 'Capacity',
    value: 82,
    unit: '%',
    lowThreshold: 50,
    highThreshold: 90,
    history: Array(20).fill(0).map(() => Math.random() * 40 + 50),
    icon: 'gauge',
    description: 'Current capacity utilization',
  },
};