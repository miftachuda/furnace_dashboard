import React from "react";
import { Activity, Settings } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header
      style={{
        transformOrigin: "top left",
        width: `100vw`,
        height: `9vh`,
      }}
      className="bg-slate-900/100 backdrop-blur-sm border-b border-slate-800 py-[1vh] px-[2vh] flex justify-between items-center fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center gap-0">
        <img
          src="/assets/icon.png"
          alt="furnace"
          className="h-[7vh] ml-5 mr-5"
        />
        <h1 className="text-[6vh] font-bold text-slate-100">
          LOC II FURNACE DASHBOARD
        </h1>
      </div>

      <div className="flex items-center gap-[4vh]">
        <div className="flex items-center gap-[2vh]">
          {/* <div>
            <img
              src="/assets/loc.png"
              alt="Location"
              className="h-[4vh] w-full"
            />
          </div> */}
          {/* <div className="flex h-[1.5vh] w-[1.5vh] items-center justify-center">
            <span className="animate-ping absolute inline-flex h-[1vh] w-[1vh] rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[1vh] w-[1vh] bg-emerald-500"></span>
          </div>
          <span className="text-[2vh] text-slate-300">Live Data</span> */}
        </div>

        {/* <button className="p-[1vh] rounded-full hover:bg-slate-800 transition-colors">
          <Settings className="h-[2.5vh] w-[2.5vh] text-slate-400" />
        </button> */}
      </div>
    </header>
  );
};

export default Header;
