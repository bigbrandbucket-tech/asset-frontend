import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
// import axios from "axios";
import axiosInstance from "../api/axiosAPI";

// Normalized type mapping: backend type => { label, color }
const typeMap = {
  Hvac: { label: "HVAC", color: "#28a745" }, // green
  Electrical: { label: "Electrical", color: "#ff7f00" }, // orange
  Plumbing: { label: "Plumbing", color: "#40E0D0" }, // light blue
  Fire: { label: "Fire Fighting", color: "#FF4C4C" }, // red
};

const CustomBar = (props) => {
  const { x, y, width, height, fill, value } = props;
  const minBarHeight = 5;
  const displayHeight = value === 0 ? minBarHeight : height;
  const displayY = value === 0 ? y - minBarHeight : y;

  return (
    <rect x={x} y={displayY} width={width} height={displayHeight} fill={fill} rx={3} />
  );
};

const BarChartComponent = () => {
  const [data, setData] = useState([]);
const axios = axiosInstance();
useEffect(() => {
  const fetchAssetTypeData = async () => {
    try {
      const response = await axios.get(
        "/assets/type-count"
      );

      const tempData = Object.entries(typeMap).map(([key, value]) => ({
        name: value.label,
        value: 0,
      }));

      response.data.forEach((item) => {
        const matchedKey = Object.keys(typeMap).find(
          (k) =>
            k.toLowerCase().replace(/\s/g, "") ===
            item.type?.toLowerCase().replace(/\s/g, "")
        );
        if (matchedKey) {
          const label = typeMap[matchedKey].label;
          const match = tempData.find((d) => d.name === label);
          if (match) match.value = item.count;
        }
      });

      setData(tempData);
    } catch (error) {
      console.error("Failed to fetch asset type data:", error);
    }
  };

  fetchAssetTypeData();
}, []);


  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" shape={<CustomBar />}>
            {data.map((entry, index) => {
              const entryKey = Object.keys(typeMap).find(
                (key) => typeMap[key].label === entry.name
              );
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={typeMap[entryKey]?.color || "#8884d8"}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;