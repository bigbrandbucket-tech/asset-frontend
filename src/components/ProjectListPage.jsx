import SideNavBar from "./SideNavBar";
import styles from "./ProjectListPage.module.css";
import Header from "./Header";
import ProjectsList from "./ProjectsList";

const ProjectListPage = () => {
  return (
    <>
      <div className={styles.container}>
        <SideNavBar></SideNavBar>
        <main className={styles.mainContent}>
          <Header></Header>
         <div>
            <ProjectsList></ProjectsList>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProjectListPage;
