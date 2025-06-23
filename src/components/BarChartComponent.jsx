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
import axios from "axios";

const BarChartComponent = () => {
  const [data, setData] = useState([]);

  // Define consistent types and colors
  const typeColorMap = {
    HVAC: "#4CAF50", // green
    Electrical: "#FFA500", // orange
    Plumbing: "#87CEFA", // light blue
    "Fire Fighting": "#FF4C4C", // red
  };

  useEffect(() => {
    const fetchAssetTypeData = async () => {
      try {
        const response = await axios.get(
          "https://asset-backend-tuna.onrender.com/api/assets/type-count"
        );

        // Step 1: Initialize all types with 0
        const defaultData = Object.keys(typeColorMap).map((type) => ({
          name: type,
          value: 0,
        }));

        // Step 2: Fill in real data
        response.data.forEach((item) => {
          const match = defaultData.find((d) => d.name === item.type);
          if (match) {
            match.value = item.count;
          }
        });

        setData(defaultData);
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
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={typeColorMap[entry.name] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
