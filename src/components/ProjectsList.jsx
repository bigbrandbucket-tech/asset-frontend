import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ClientList.module.css";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://asset-backend-tuna.onrender.com/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.assetTable}>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Client</th>
            <th>Contact POC Name</th>
            <th>Contact POC Number</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.projectName}</td>
              <td>{project.client?.clientName || "N/A"}</td>
              <td>{project.pocName}</td>
              <td>{project.pocNumber}</td>
              <td>{project.email}</td>
              <td>{project.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsList;
