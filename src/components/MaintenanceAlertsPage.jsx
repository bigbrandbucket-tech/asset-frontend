import SideNavBar from "./SideNavBar";
import styles from "./MaintenanceAlertsPage.module.css";
import Header from "./Header";
import MaintenanceAlertsList from "./MaintenanceAlertsList";

const MaintenanceAlertsPage = () => {
  return (
    <>
      <div className={styles.container}>
        <SideNavBar></SideNavBar>
        <main className={styles.mainContent}>
          <Header></Header>
          <div>
            <MaintenanceAlertsList></MaintenanceAlertsList>
          </div>
        </main>
      </div>
    </>
  );
};

export default MaintenanceAlertsPage;
