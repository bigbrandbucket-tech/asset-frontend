import SideNavBar from "./SideNavBar";
import styles from "./TotalClientsPage.module.css";
import Header from "./Header";
import ClientList from "./ClientList";

const ClientListPage = () => {
  return (
    <>
      <div className={styles.container}>
        <SideNavBar></SideNavBar>
        <main className={styles.mainContent}>
          <Header></Header>
          <div>
            <ClientList></ClientList>
          </div>
        </main>
      </div>
    </>
  );
};

export default ClientListPage;
