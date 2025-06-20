import { useNavigate } from "react-router-dom";
import styles from "./SideNavBar.module.css";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const SideNavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // State for dropdowns
  const [openMenu, setOpenMenu] = useState(null);

  // Toggle function
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src="/MEP.jpg" className={styles.logo} alt="Logo" />
      </div>

      <ul className={styles.sidebarMenu}>
        <li onClick={() => handleNavigation("/AdminDashboard")}>Home</li>

        <li className={styles.dropdown} onClick={() => toggleMenu("client")}>
          Client
          <h2 className={styles.icon}>
            <DownOutlined />
          </h2>
          {openMenu === "client" && (
            <ul className={styles.dropdownMenu}>
              <li onClick={() => handleNavigation("/AddClientPage")}>
                Add client
              </li>
              <li onClick={() => handleNavigation("/ClientListPage")}>
                Client list
              </li>
            </ul>
          )}
        </li>

        

        <li className={styles.dropdown} onClick={() => toggleMenu("projects")}>
          Projects
          <h2 className={styles.icon}>
            <DownOutlined />
          </h2>
          {openMenu === "projects" && (
            <ul className={styles.dropdownMenu}>
              <li onClick={() => handleNavigation("/AddProjectPage")}>
                Add project
              </li>
              <li onClick={() => handleNavigation("/ProjectListPage")}>
                Project list
              </li>
            </ul>
          )}
        </li>
        <li className={styles.dropdown} onClick={() => toggleMenu("user")}>
          User
          <h2 className={styles.icon}>
            <DownOutlined />
          </h2>
          {openMenu === "user" && (
            <ul className={styles.dropdownMenu}>
              <li onClick={() => handleNavigation("/AddUserPage")}>
                Add user
              </li>
              <li onClick={() => handleNavigation("/UserListPage")}>
                user list
              </li>
            </ul>
          )}
        </li>
        <li className={styles.dropdown} onClick={() => toggleMenu("asset")}>
          Asset
          <h2 className={styles.icon}>
            <DownOutlined />
          </h2>
          {openMenu === "asset" && (
            <ul className={styles.dropdownMenu}>
              <li onClick={() => handleNavigation("/AddAssetPage")}>
                Add asset
              </li>
              <li onClick={() => handleNavigation("/total-assets")}>
                Asset list
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default SideNavBar;
