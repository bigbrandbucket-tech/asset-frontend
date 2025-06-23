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
} from "recharts";
import axios from "axios";

const BarChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAssetTypeData = async () => {
      try {
        const response = await axios.get("http://asset-backend-tuna.onrender.com/api/assets/type-count");
        // Convert backend response into the format expected by Recharts
        const formattedData = response.data.map((item) => ({
          name: item.type,
          value: item.count,
        }));
        setData(formattedData);
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
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#262756" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
