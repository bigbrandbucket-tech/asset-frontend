import SideNavBar from "./SideNavBar";
import styles from "./TotalClientsPage.module.css";
import Header from "./Header";
import UserList from "./UserList";

const UserListPage = () => {
  return (
    <>
      <div className={styles.container}>
        <SideNavBar></SideNavBar>
        <main className={styles.mainContent}>
          <Header></Header>
          <div className={styles.listDiv}>
            <UserList></UserList>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserListPage;
