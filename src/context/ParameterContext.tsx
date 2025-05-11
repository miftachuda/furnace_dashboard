import React, { createContext, useContext, useState } from 'react';
import { ParameterData, ParameterContextType } from '../types';
import { initialParameterData } from '../utils/constants';

const ParameterContext = createContext<ParameterContextType | undefined>(undefined);

export const ParameterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parameters, setParameters] = useState<Record<string, ParameterData>>(initialParameterData);

  const updateParameter = (id: string, value: number) => {
    setParameters((prev) => {
      if (!prev[id]) return prev;
      
      const newHistory = [...prev[id].history.slice(-19), value];
      
      return {
        ...prev,
        [id]: {
          ...prev[id],
          value,
          history: newHistory,
        },
      };
    });
  };

  return (
    <ParameterContext.Provider value={{ parameters, updateParameter }}>
      {children}
    </ParameterContext.Provider>
  );
};

export const useParameters = (): ParameterContextType => {
  const context = useContext(ParameterContext);
  if (context === undefined) {
    throw new Error('useParameters must be used within a ParameterProvider');
  }
  return context;
};