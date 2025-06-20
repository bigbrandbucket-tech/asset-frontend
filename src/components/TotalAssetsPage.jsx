import SideNavBar from "./SideNavBar";
import styles from "./TotalAssetsPage.module.css";
import Header from "./Header";
import AssetListPage from "./AssetList";

const TotalAssetsPage = () => {
  return (
    <>
      <div className={styles.container}>
        <SideNavBar></SideNavBar>
        <main className={styles.mainContent}>
          <Header></Header>
          <div>
            <AssetListPage></AssetListPage>
          </div>
        </main>
      </div>
    </>
  );
};

export default TotalAssetsPage;
