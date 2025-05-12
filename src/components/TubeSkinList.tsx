import React from "react";
import { ParameterData } from "../types";
import TubeSkin from "./TubeSkin";

interface TubeSkinListProps {
  parameters: ParameterData[];
}

const TubeSkinList: React.FC<TubeSkinListProps> = ({ parameters }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {parameters.map((param, index) => (
        <TubeSkin key={index} parameter={param} />
      ))}
    </div>
  );
};

export default TubeSkinList;
