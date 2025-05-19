import React, { useState, useEffect } from "react";
import BurnerColumn from "./BurnerColumn";
import { BurnerState } from "./SwitchBurner";
import { supabase } from "../utils/supabase";

interface BurnerItem {
  id: number;
  number: number;
  state: BurnerState;
}

interface BurnerStateRecord {
  id: string;
  burner_number: number;
  state: BurnerState;
}

const BurnerPanel: React.FC = () => {
  const [burneres, setBurneres] = useState<BurnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBurnerStates();
  }, []);

  const fetchBurnerStates = async () => {
    try {
      const { data, error } = await supabase
        .from("burner_states")
        .select("*")
        .order("burner_number");

      if (error) throw error;

      const formattedBurneres = (data as BurnerStateRecord[]).map((record) => ({
        id: record.burner_number - 1,
        number: record.burner_number,
        state: record.state as BurnerState,
      }));

      setBurneres(formattedBurneres);
    } catch (error) {
      console.error("Error fetching burner states:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBurnerClick = async (id: number, state: string) => {
    const burnerNumber = id + 1;
    const burner = burneres.find((b) => b.id === id);
    if (!burner) return;

    try {
      const { error } = await supabase
        .from("burner_states")
        .update({ state: state })
        .eq("burner_number", burnerNumber);

      if (error) throw error;

      setBurneres((prevBurneres) =>
        prevBurneres.map((burner) => {
          if (burner.id === id) {
            return { ...burner, state: state as BurnerState };
          }
          return burner;
        })
      );
    } catch (error) {
      console.error("Error updating burner state:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Split burneres into left and right columns
  const leftBurneres = burneres.filter((burner) => burner.number >= 11);
  const rightBurneres = burneres
    .filter((burner) => burner.number <= 10)
    .sort((a, b) => b.number - a.number);
  const offCount = burneres.filter((item) => item.state === "Off").length;
  const Gas = burneres.filter((item) => item.state === "G").length;
  const Oil = burneres.filter((item) => item.state === "O").length;
  const Dual = burneres.filter((item) => item.state === "D").length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mt-8 w-full text-center text-4xl font-bold text-slate-300 mb-4">
        <p className="mt-2">Burner Configuration</p>
      </div>
      <div className="flex justify-center items-center gap-1">
        <div className="flex flex-row gap-4 place-items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-3xl p-2 border-4 border-lime-400 ">
              <BurnerColumn
                items={leftBurneres}
                onBurnerClick={handleBurnerClick}
              />
            </div>

            <div className="rounded-3xl p-2 border-4 border-lime-400 ">
              <BurnerColumn
                items={rightBurneres}
                reversed={true}
                onBurnerClick={handleBurnerClick}
              />
            </div>
          </div>
          <div className=" text-center">
            <h2 className="text-3xl font-bold border border-teal-400 p-2 rounded-lg mb-2 bg-blue-500">
              <span className="text-teal-100">{Gas + Dual} </span>
              <span className="text-blue-100">Gas</span>
            </h2>
            <h3 className="text-3xl font-bold border border-teal-400 p-2 rounded-lg bg-yellow-500">
              <span className="text-teal-100">{Dual} </span>
              <span className="text-yellow-100">Dual</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-1 w-full text-center text-xl font-bold text-slate-500">
        <p className="mt-2">
          <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span>{" "}
          O (Oil)
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full ml-4 mr-1"></span>{" "}
          G (Gas)
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full ml-4 mr-1"></span>{" "}
          D (Dual)
          <span className="inline-block w-3 h-3 bg-gray-300 rounded-full ml-4 mr-1"></span>{" "}
          (Off)
        </p>
      </div>
    </div>
  );
};

export default BurnerPanel;
