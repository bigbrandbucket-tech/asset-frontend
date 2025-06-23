import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AssetList.module.css";

const AssetListPage = ({ showActiveOnly = false }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const url = showActiveOnly
          ? "https://asset-backend-tuna.onrender.com/api/assets/active"
          : "https://asset-backend-tuna.onrender.com/api/assets";
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
            <th>Type</th>
            <th>OEM / MANUFACTURER</th>
            <th>Asset Name</th>
            <th>Model</th>
            <th>Equipment No.</th>
            <th>Warranty Expiry</th>
            <th>Location (Lat, Long)</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a, index) => (
            <tr key={index}>
              <td>{a.type}</td>
              <td>{a.makeOrOEM}</td>
              <td>{a.assetName}</td>
              <td>{a.model}</td>
              <td>{a.tag}</td>
              <td>{new Date(a.warrantyExpiryDate).toLocaleDateString()}</td>
              <td>
                {a.location?.latitude ?? "-"}, {a.location?.longitude ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetListPage;
