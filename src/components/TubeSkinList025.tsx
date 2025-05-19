import React from "react";
import { ParameterData } from "../types";
import TubeSkin from "./TubeSkin";

interface TubeSkinListProps {
  parameters: ParameterData[];
}

const TubeSkinList: React.FC<TubeSkinListProps> = ({ parameters }) => {
  return (
    <div className="grid grid-rows-2 auto-cols-auto grid-flow-col gap-8">
      {parameters.map((param, index) => (
        <TubeSkin key={index} parameter={param} />
      ))}
    </div>
  );
};

export default TubeSkinList;
