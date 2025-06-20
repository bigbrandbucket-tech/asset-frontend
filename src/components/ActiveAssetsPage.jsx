import SideNavBar from "./SideNavBar";
import styles from "./ActiveAssetsPage.module.css";
import Header from "./Header";
import AssetListPage from "./AssetList";

const ActiveAssetsPage = () => {
  return (
    <div className={styles.container}>
      <SideNavBar />
      <main className={styles.mainContent}>
        <Header />
        <div className={styles.innerContainer}>
          <h2 style={{ marginBottom: "20px" }}>Active Assets</h2>
          <AssetListPage showActiveOnly={true} />
        </div>
      </main>
    </div>
  );
};

export default ActiveAssetsPage;
