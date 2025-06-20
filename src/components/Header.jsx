import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const handleLogoutOnclick = () => {
    navigate("/");
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Admin Dashboard</h1>
          <div className={styles.headerButtons}>
            <button>Profile</button>
            <button onClick={handleLogoutOnclick}>Logout</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
