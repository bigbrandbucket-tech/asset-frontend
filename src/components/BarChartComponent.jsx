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

// Normalized type mapping: backend type => { label, color }
const typeMap = {
  hvac: { label: "HVAC", color: "#28a745" }, // green
  electrical: { label: "Electrical", color: "#ff7f00" }, // orange
  plumbing: { label: "Plumbing", color: "#40E0D0" }, // light blue
  firefighting: { label: "Fire Fighting", color: "#FF4C4C" }, // red
};

const BarChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAssetTypeData = async () => {
      try {
        const response = await axios.get(
          "https://asset-backend-tuna.onrender.com/api/assets/type-count"
        );

        // Step 1: Start with 0 values for all defined types
        const tempData = Object.entries(typeMap).map(([key, value]) => ({
          name: value.label,
          value: 0,
        }));

        // Step 2: Map backend data to known types
        response.data.forEach((item) => {
          const key = item.type?.toLowerCase().replace(/\s/g, "");
          if (typeMap[key]) {
            const label = typeMap[key].label;
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
          <Bar dataKey="value">
            {data.map((entry, index) => {
              // Get color from typeMap by reverse-matching the label
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
