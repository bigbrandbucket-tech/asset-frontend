import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ClientList.module.css";

const ClientList = () => {
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("https://asset-backend-tuna.onrender.com/api/clients");
        setClientList(res.data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.assetTable}>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Contact POC Name</th>
            <th>Contact POC Number</th>
            <th>Email Address</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {clientList.map((client) => (
            <tr key={client._id}>
              <td>{client.clientName}</td>
              <td>{client.pocName}</td>
              <td>{client.pocNumber}</td>
              <td>{client.email}</td>
              <td>{client.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
