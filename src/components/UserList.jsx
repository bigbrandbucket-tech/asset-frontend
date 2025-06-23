import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ClientList.module.css"; 

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://asset-backend-tuna.onrender.com/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.assetTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Assigned Project</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email || "—"}</td>
              <td>{user.phone || "—"}</td>
              <td>{user.role || "—"}</td>
              <td>{user.assignedProject?.projectName || "Not Assigned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
