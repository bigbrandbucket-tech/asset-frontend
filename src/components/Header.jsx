import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./Header.module.css";

const Header = ({ onProjectSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const showDropdown = ["/AddAssetPage", "/AddUserPage"].includes(location.pathname);

  useEffect(() => {
    if (showDropdown) fetchProjects();
  }, [showDropdown]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
    if (onProjectSelect) {
      onProjectSelect(projectId);
    }
  };

  const handleLogoutOnclick = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>

        {showDropdown && (
          <div className={styles.projectSelector}>
            <label htmlFor="projectSelect" className={styles.label}>
              Select Project:
            </label>
            <select
              id="projectSelect"
              className={styles.projectDropdown}
              value={selectedProject}
              onChange={handleProjectChange}
            >
              <option value="">-- Choose a project --</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.projectName}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.headerButtons}>
          <button className={styles.headerBtn}>Profile</button>
          <button className={styles.headerBtn} onClick={handleLogoutOnclick}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
