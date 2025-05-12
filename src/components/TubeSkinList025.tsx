import React from "react";
import { ParameterData } from "../types";
import TubeSkin from "./TubeSkin";

interface TubeSkinListProps {
  parameters: ParameterData[];
}

const TubeSkinList: React.FC<TubeSkinListProps> = ({ parameters }) => {
  return (
    <div className="grid grid-cols-4 gap-y-7 gap-x-36 justify-items-start">
      {parameters.map((param, index) => (
        <TubeSkin key={index} parameter={param} />
      ))}
    </div>
  );
};

export default TubeSkinList;
