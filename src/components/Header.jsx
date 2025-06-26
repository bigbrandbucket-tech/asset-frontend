import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./Header.module.css";
import { useProject } from "./ProjectContext"; // ✅ import context

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProject, setSelectedProject } = useProject(); // ✅ use global state

  const [projects, setProjects] = useState([]);

  const showDropdown = ["/AddAssetPage", "/AddUserPage"].includes(location.pathname);

  useEffect(() => {
    if (showDropdown) fetchProjects();
  }, [showDropdown]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId); // ✅ update context
  };

  const handleLogoutOnclick = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/");
};


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>

        <div className={styles.headerButtons}>
          {showDropdown && (
            <div className={styles.projectWrapper}>
              <label htmlFor="projectSelect" className={styles.projectLabel}>
                Select Project
              </label>
              <select
                id="projectSelect"
                className={styles.projectSelect}
                value={selectedProject}
                onChange={handleProjectChange}
              >
                <option value="" disabled hidden>
                  -- Choose --
                </option>
                {projects.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.projectName}
                  </option>
                ))}
              </select>
            </div>
          )}

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
