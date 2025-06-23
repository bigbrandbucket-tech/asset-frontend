import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AssetList.module.css";

const AssetListPage = ({ showActiveOnly = false }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const url = showActiveOnly
          ? "http://asset-backend-tuna.onrender.com/api/assets/active"
          : "http://asset-backend-tuna.onrender.com/api/assets";
        const res = await axios.get(url);
        setAssets(res.data);
      } catch (err) {
        console.error("Error fetching assets:", err);
      }
    };

    fetchAssets();
  }, [showActiveOnly]);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.assetTable}>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Rep Phone</th>
            <th>Warranty Expiry</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a, index) => (
            <tr key={index}>
              <td>{a.assetName}</td>
              <td>{a.type}</td>
              <td>{a.location}</td>
              <td>{a.repPhone}</td>
              <td>{new Date(a.warrantyExpiryDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetListPage;
