import React, { useCallback, useEffect, useState } from "react";
import ParameterCard from "./ParameterCard";
import ParameterCardNoChart from "./ParameterCardNoChart";

import {
  fetchTagNames,
  getValueByTag,
  getValuesByTag,
  TagData,
} from "../API/fetch";
import { ParameterData } from "../types";
import ParamCardMini from "./ParamCardMini";
import FuelToggle1 from "./FuelToggle1";
import FireAnimation from "./Fire";
import FuelToggle2 from "./FuelToggle2";

// 021

const Dashboard: React.FC = () => {
  const sg_fuel_gas = 0.8231;
  const mass_air_per_kg = 1.225;
  const tsrf_fuel_gas_fact = 1.0818;
  const tsrf_fuel_oil_fact = 0.9864;
  const [datas, setDatas] = useState<TagData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const list_tag = [
    "021AI_005.pv", // analyzer 021F-102
    "021AI_002.pv", // analyzer 021F-101
    "025AI_001.pv", // analyzer 025F-101 Selatan
    "025AI_002.pv", // analyzer 025F-101 Utara

    "021FI_004.pv", //flow feed 021
    "021FY_004X.c1", //Sg long res
    "021FI_020.pv", //flow FG f1
    "021FI_091A.pv", //flow FG f2
    "021AI_002.pv", //o2 021F101
    "021AI_005.pv", // o2 021F102

    "021TI_025.PV", //bwt 021f101
    "021TI_059.PV", //bwt 021f102
    "021TI_037.pv", //stack temp 021
    "025TI_094.PV", //bwt 025f101
    "025TI_013.PV", //bwt 025f101
    "025TI_093.pv", //stack temp 025
    "025TI_014.pv", //stack temp 025

    "021TI_708.pv", //CIT 021F-101
    "021TIC_271.pv", //COT 021F-101

    "021TI_041.pv", //CIT 021F-102
    "021TIC_288.pv", //COT 021F-102

    "025TI_001.pv", //CIT 025F-101
    "025TIC_092.pv", //COT 025F-101

    "021FY_058X.C1", //sg SPO
    "025FIC_004.pv", //flow hot oil
    "025FI_014.PV", //flow fg 025
    "002FI_035.PV", // flow oil 025
    "025AI_001.pv", //02 selatan
    "025AI_002.pv", //02 utara
  ];
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchTagNames(list_tag, "now-1H", 60, 500);
      setDatas(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [list_tag]); // Include all dependencies here

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up refresh interval
    const intervalId = setInterval(fetchData, 15000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  // Render states
  if (isLoading && datas.length === 0) {
    return <div className="loading-indicator">Loading initial data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (datas.length === 0) {
    return <div className="empty-state">No data available</div>;
  }

  function calculateTonCapacity(
    flow: string,
    sg_comp: string,
    datas: TagData[],
    lengthFromLast: number
  ): number[] {
    const values1: number[] = getValuesByTag(flow, datas);
    const values2: number[] = getValuesByTag(sg_comp, datas);

    if (!Array.isArray(values1) || !Array.isArray(values2)) {
      throw new Error("One or both getValueByTag results are not arrays");
    }

    const flow_slice1 = values1.slice(-lengthFromLast);
    const sg_comp_slice2 = values2.slice(-lengthFromLast);

    const result: number[] = flow_slice1.map(
      (flow_value: unknown, index: number) => {
        const sg_comp_value = sg_comp_slice2[index];
        if (
          typeof flow_value === "number" &&
          typeof sg_comp_value === "number"
        ) {
          return flow_value * 24 * sg_comp_value;
        }
        return 0;
      }
    );

    return result;
  }
  const list_ton_capacity_021 = calculateTonCapacity(
    "021FI_004.pv",
    "021FY_004X.c1",
    datas,
    10
  );
  const list_capacity_021 = list_ton_capacity_021.map(
    (value: number | null) => {
      if (value) {
        return (value / 3883) * 100;
      } else {
        return 0;
      }
    }
  );
  const ton_capacity_021 =
    list_ton_capacity_021[list_ton_capacity_021.length - 1];

  const capacity_021 = list_capacity_021[list_capacity_021.length - 1];

  // trsf 021 //
  const values1 = getValuesByTag("021FI_020.pv", datas);
  const values2 = getValuesByTag("021FI_091A.pv", datas);

  const tonf1_list = values1.map(
    (v) => (v * sg_fuel_gas * mass_air_per_kg * 24) / 1000
  );
  const tonf2_list = values2.map(
    (v) => (v * sg_fuel_gas * mass_air_per_kg * 24) / 1000
  );

  // Combine and compute tsrf_021 list
  const tsrf_021_list = tonf1_list.map((val, i) => {
    const total_fuel = val + tonf2_list[i];
    return ((total_fuel * tsrf_fuel_gas_fact) / ton_capacity_021) * 100;
  });
  const tsrf_021 = tsrf_021_list[tsrf_021_list.length - 1];

  // tsrf 025 //
  const fic_004 = getValuesByTag("025FIC_004.pv", datas);
  const fy_058x = getValuesByTag("021FY_058X.C1", datas);
  const fi_014 = getValuesByTag("025FI_014.PV", datas);
  const fi_035 = getValuesByTag("002FI_035.PV", datas);

  const tsrf_025_list = fic_004.map((_, i) => {
    const ton_capacity_025 = fic_004[i] * 24 * fy_058x[i];
    const ton_fg_025 = (fi_014[i] * sg_fuel_gas * mass_air_per_kg * 24) / 1000;
    const ton_fo_025 = fi_035[i] * fy_058x[i] * 24;

    return (
      ((ton_fg_025 * 1.313 + ton_fo_025 * tsrf_fuel_oil_fact) /
        ton_capacity_025) *
      100
    );
  });

  // Safe access to the last element in the list
  const tsrf_025 = tsrf_025_list[tsrf_025_list.length - 1];

  const capacity: ParameterData = {
    id: "Cap",
    name: "Capacity HVU II (021)",
    value: capacity_021,
    unit: "%",
    lowThreshold: 65,
    highThreshold: 70,
    history: list_capacity_021,
    icon: "flowmeter", // could be a filename or icon name
    description: "Capacity unit 021",
  };

  const tsrf021: ParameterData = {
    id: "TSRF021",
    name: "% TSRF 021",
    value: tsrf_021,
    unit: "%",
    lowThreshold: 0.0,
    highThreshold: 1.03,
    history: tsrf_021_list,
    icon: "calculator", // could be a filename or icon name
    description: "TSRF unit 021",
  };
  const tsrf025: ParameterData = {
    id: "TSRF025",
    name: "% TSRF 025",
    value: tsrf_025,
    unit: "%",
    lowThreshold: 0.0,
    highThreshold: 0.59,
    history: [0.5, 0.4, 0.45, 0.65, 0.54],
    icon: "calculator", // could be a filename or icon name
    description: "TSRF unit 025",
  };
  const o2f1_values = getValuesByTag("021AI_002.pv", datas);
  const o2f1: ParameterData = {
    id: "Oxygen021F101",
    name: "O₂ Excess",
    value: o2f1_values[o2f1_values.length - 1],
    unit: "%",
    lowThreshold: 2.0,
    highThreshold: 5.0,
    history: o2f1_values,
    icon: "calculator", // could be a filename or icon name
    description: "Oxygen Excess 021F101",
  };
  const o2f2_values = getValuesByTag("021AI_005.pv", datas);
  const o2f2: ParameterData = {
    id: "Oxygen021F102",
    name: "O₂ Excess",
    value: o2f2_values[o2f2_values.length - 1],
    unit: "%",
    lowThreshold: 2.0,
    highThreshold: 5.0,
    history: o2f2_values,
    icon: "calculator", // could be a filename or icon name
    description: "Oxygen Excess 021F102",
  };
  const o2025selatan_values = getValuesByTag("025AI_001.pv", datas);
  const o2025selatan: ParameterData = {
    id: "Oxygen025F101Selatan",
    name: "O₂ Excess",
    value: o2025selatan_values[o2025selatan_values.length - 1],
    unit: "%",
    lowThreshold: 2.0,
    highThreshold: 5.0,
    history: o2025selatan_values,
    icon: "calculator", // could be a filename or icon name
    description: "Oxygen Excess 025F101 South",
  };
  const o2025utara_values = getValuesByTag("025AI_002.pv", datas);
  const o2025utara: ParameterData = {
    id: "Oxygen025F101Utara",
    name: "O₂ Excess",
    value: o2025utara_values[o2025utara_values.length - 1],
    unit: "%",
    lowThreshold: 2.0,
    highThreshold: 5.0,
    history: o2025utara_values,
    icon: "calculator", // could be a filename or icon name
    description: "Oxygen Excess 025F101 North",
  };
  const bwt_021_F101_values = getValuesByTag("021TI_025.pv", datas);
  const bwt_021_F101: ParameterData = {
    id: "BWT021F101",
    name: "BWT Temp 021F-101",
    value: bwt_021_F101_values[bwt_021_F101_values.length - 1],
    unit: "℃",
    lowThreshold: 500,
    highThreshold: 850,
    history: bwt_021_F101_values,
    icon: "calculator", // could be a filename or icon name
    description: "BWT 021F101",
  };
  const bwt_021_F102_values = getValuesByTag("021TI_059.pv", datas);
  const bwt_021_F102: ParameterData = {
    id: "BWT021F102",
    name: "BWT Temp 021F-102",
    value: bwt_021_F102_values[bwt_021_F102_values.length - 1],
    unit: "℃",
    lowThreshold: 500,
    highThreshold: 850,
    history: bwt_021_F102_values,
    icon: "calculator", // could be a filename or icon name
    description: "BWT 021F102",
  };
  const bwt_025_F101_s_values = getValuesByTag("025TI_094.PV", datas);
  const bwt_025_F101_s: ParameterData = {
    id: "BWT025F101South",
    name: "BWT Temp 025F-101 South",
    value: bwt_025_F101_s_values[bwt_025_F101_s_values.length - 1],
    unit: "℃",
    lowThreshold: 500,
    highThreshold: 850,
    history: bwt_025_F101_s_values,
    icon: "calculator", // could be a filename or icon name
    description: "BWT 025F101 South",
  };
  const bwt_025_F101_u_values = getValuesByTag("025TI_013.PV", datas);
  const bwt_025_F101_u: ParameterData = {
    id: "BWT025F101North",
    name: "BWT Temp 025F-101 North",
    value: bwt_025_F101_u_values[bwt_025_F101_u_values.length - 1],
    unit: "℃",
    lowThreshold: 500,
    highThreshold: 850,
    history: bwt_025_F101_u_values,
    icon: "calculator", // could be a filename or icon name
    description: "BWT 025F101 North",
  };

  // CIT COT

  const cit_025_F101_values = getValuesByTag("025TI_001.pv", datas);
  const cit_025_F101: ParameterData = {
    id: "CIT025F101",
    name: "CIT Temp 025F-101",
    value: cit_025_F101_values[cit_025_F101_values.length - 1],
    unit: "℃",
    lowThreshold: 230,
    highThreshold: 300,
    history: cit_025_F101_values,
    icon: "calculator", // could be a filename or icon name
    description: "CIT 025F101",
  };
  const cot_025_F101_values = getValuesByTag("025TIC_092.pv", datas);
  const cot_025_F101: ParameterData = {
    id: "COT025F101",
    name: "COT Temp 025F-101",
    value: cot_025_F101_values[cot_025_F101_values.length - 1],
    unit: "℃",
    lowThreshold: 280,
    highThreshold: 330,
    history: cot_025_F101_values,
    icon: "calculator", // could be a filename or icon name
    description: "CIT 025F101",
  };
  const cit_021_F101_values = getValuesByTag("021TI_708.pv", datas);
  const cit_021_F101: ParameterData = {
    id: "CIT021F101",
    name: "CIT Temp 021F-101",
    value: cit_021_F101_values[cit_021_F101_values.length - 1],
    unit: "℃",
    lowThreshold: 280,
    highThreshold: 300,
    history: cit_021_F101_values,
    icon: "calculator", // could be a filename or icon name
    description: "CIT 021F101",
  };
  const cot_021_F101_values = getValuesByTag("021TIC_271.pv", datas);
  const cot_021_F101: ParameterData = {
    id: "COT021F101",
    name: "COT Temp 021F-101",
    value: cot_021_F101_values[cot_021_F101_values.length - 1],
    unit: "℃",
    lowThreshold: 300,
    highThreshold: 390,
    history: cot_021_F101_values,
    icon: "calculator", // could be a filename or icon name
    description: "COT 021F101",
  };
  const cit_021_F102_values = getValuesByTag("021TI_041.pv", datas);
  const cit_021_F102: ParameterData = {
    id: "CIT021F102",
    name: "CIT Temp 021F-102",
    value: cit_021_F102_values[cit_021_F102_values.length - 1],
    unit: "℃",
    lowThreshold: 300,
    highThreshold: 350,
    history: cit_021_F102_values,
    icon: "calculator", // could be a filename or icon name
    description: "CIT 021F102",
  };
  const cot_021_F102_values = getValuesByTag("021TIC_288.pv", datas);
  const cot_021_F102: ParameterData = {
    id: "COT021F102",
    name: "COT Temp 021F-102",
    value: cot_021_F102_values[cot_021_F102_values.length - 1],
    unit: "℃",
    lowThreshold: 300,
    highThreshold: 390,
    history: cot_021_F102_values,
    icon: "calculator", // could be a filename or icon name
    description: "COT 021F102",
  };

  return (
    <div className="relative w-full h-screen">
      {/* Parameter cards layered on top */}
      <div className="absolute inset-0 z-10 p-6">
        <div
          className="absolute w-64 h-64"
          style={{
            transform: "scale(0.96) translate(-50%, -50%) ",
            left: "16%",
            top: "65%",
          }}
        >
          <img
            src="/assets/pipe.png"
            alt="Status animation"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-55"
          />
        </div>
        <div
          className="absolute w-64 h-64"
          style={{
            transform: "scale(0.96) translate(-50%, -50%) ",
            left: "47%",
            top: "65%",
          }}
        >
          <img
            src="/assets/pipe.png"
            alt="Status animation"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-55"
          />
        </div>
        <div
          className="absolute w-64 h-64"
          style={{
            transform: "scale(1.36) translate(-50%, -50%) ",
            left: "80%",
            top: "70%",
          }}
        >
          <img
            src="/assets/pipe.png"
            alt="Status animation"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none    opacity-55"
          />
        </div>

        <div
          className=" absolute w-56"
          style={{
            transform: "scale(0.76) translate(-50%, -50%) ",
            left: "14%",
            top: "84%",
          }}
        >
          <FuelToggle1 />
        </div>

        <div
          className=" absolute w-56"
          style={{
            transform: "scale(0.76) translate(-50%, -50%) ",
            left: "45%",
            top: "84%",
          }}
        >
          <FuelToggle2 />
        </div>

        {/* Capacity */}

        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.76) translate(-50%, -50%) ",
            left: "3%",
            top: "10%",
          }}
        >
          <ParameterCardNoChart key="021 Capacity" parameter={capacity} />
        </div>

        {/* TSRF 021 */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.76) translate(-50%, -50%) ",
            left: "28%",
            top: "88%",
          }}
        >
          <ParameterCard key="021 TSRF" parameter={tsrf021} />
        </div>

        {/* TSRF 025 */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.76) translate(-50%, -50%) ",
            left: "78%",
            top: "88%",
          }}
        >
          <ParameterCard key="025 TSRF" parameter={tsrf025} />
        </div>

        {/* Oxygen 021F101 */}

        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "11%",
            top: "19%",
          }}
        >
          <ParameterCard key="Oxygen 021F101" parameter={o2f1} />
        </div>

        {/* Oxygen 021F102 */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "41%",
            top: "19%",
          }}
        >
          <ParameterCard key="Oxygen 021F102" parameter={o2f2} />
        </div>

        {/* Oxygen 025F101 Selatan */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "71%",
            top: "19%",
          }}
        >
          <ParameterCard key="Oxygen 025F101 South" parameter={o2025selatan} />
        </div>

        {/* Oxygen 025F101 Utara */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "82%",
            top: "19%",
          }}
        >
          <ParameterCard key="Oxygen 025F101 North" parameter={o2025utara} />
        </div>

        {/* BWT 021F-101 */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "16%",
            top: "39%",
          }}
        >
          <ParamCardMini key="BWT 021F-101" parameter={bwt_021_F101} />
        </div>
        {/* BWT 021F-102 */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "45%",
            top: "39%",
          }}
        >
          <ParamCardMini key="BWT 021F-102" parameter={bwt_021_F102} />
        </div>
        {/* BWT 025F-101 Selatan */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "71%",
            top: "47%",
          }}
        >
          <ParamCardMini key="BWT 025F-102" parameter={bwt_025_F101_s} />
        </div>
        {/* BWT 025F-101 Utara */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "82%",
            top: "47%",
          }}
        >
          <ParamCardMini key="BWT 025F-102" parameter={bwt_025_F101_u} />
        </div>
        {/* CIT 025F-101  */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "64%",
            top: "64%",
          }}
        >
          <ParamCardMini key="CIT 025F-102" parameter={cit_025_F101} />
        </div>
        {/* COT 025F-101  */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "87%",
            top: "64%",
          }}
        >
          <ParamCardMini key="COT 025F-102" parameter={cot_025_F101} />
        </div>
        {/* CIT 021F-101  */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "5%",
            top: "64%",
          }}
        >
          <ParamCardMini key="CIT 021F-102" parameter={cit_021_F101} />
        </div>
        {/* COT 021F-101  */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "23%",
            top: "64%",
          }}
        >
          <ParamCardMini key="COT 021F-102" parameter={cot_021_F101} />
        </div>
        {/* CIT 021F-102  */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "36%",
            top: "64%",
          }}
        >
          <ParamCardMini key="CIT 021F-102" parameter={cit_021_F102} />
        </div>
        {/* COT 021F-102  */}
        <div
          className="absolute w-56 "
          style={{
            transform: "scale(0.60) translate(-50%, -50%) ",
            left: "54%",
            top: "64%",
          }}
        >
          <ParamCardMini key="COT 021F-102" parameter={cot_021_F102} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
