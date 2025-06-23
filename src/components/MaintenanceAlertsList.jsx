import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MaintenanceAlertsList.module.css";

const MaintenanceAlertsList = () => {
  const [alertAssets, setAlertAssets] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("https://asset-backend-tuna.onrender.com/api/alerts");
        setAlertAssets(res.data);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className={styles.tableWrapper}>
    <table className={styles.assetTable}>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Project Name</th>
              <th>Asset Name</th>
              <th>Expiry Date</th>
              <th>POC Number</th>
            </tr>
          </thead>
          <tbody>
            {alertAssets.map((alert, index) => (
              <tr key={index}>
                <td>{alert.asset?.clientName || "N/A"}</td>
                <td>{alert.asset?.projectName || "N/A"}</td>
                <td>{alert.asset?.assetName || "N/A"}</td>
                <td className={styles.expiryDate}>
                  {alert.asset?.warrantyExpiryDate
                    ? new Date(alert.asset.warrantyExpiryDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{alert.asset?.repPhone || "N/A"}</td>
              </tr>
            ))}

          </tbody>
        </table>
      
    </div>
  );
};

export default MaintenanceAlertsList;
