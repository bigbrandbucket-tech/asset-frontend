import { useEffect, useState } from "react";
import { TeamOutlined, ScheduleOutlined, ProjectOutlined, DatabaseOutlined, AccountBookOutlined, ThunderboltOutlined } from "@ant-design/icons";
import SideNavBar from "./SideNavBar";
import styles from "./AdminDashboard.module.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import axiosInstance from "../api/axiosAPI";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    clients: 0,
    assets: 0,
    activeAssets: 0,
    alerts: 0,
    projects: 0,
    totalPower: 0
  });

  const [assetTypeData, setAssetTypeData] = useState([]);
  const [pieData, setPieData] = useState([]);
const axios = axiosInstance();
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [clientsRes, assetsRes, powerRes, projectsRes] = await Promise.all([
          axios.get("/clients"),
          axios.get("/assets"),
          axios.get("/assets/kwh-counts"),
          axios.get("/projects")
        ]);

        const allAssets = assetsRes.data;
        const currentDate = new Date();

        // Determine active/inactive status from warrantyExpiryDate
        const activeAssets = allAssets.filter(asset =>
          asset.warrantyExpiryDate && new Date(asset.warrantyExpiryDate) > currentDate
        ).length;

        const alerts = allAssets.filter(asset => asset.alertRaised === true).length;

        const assetTypeCount = {};
        allAssets.forEach(asset => {
          if (asset.type) {
            assetTypeCount[asset.type] = (assetTypeCount[asset.type] || 0) + 1;
          }
        });

        const barFormatted = Object.entries(assetTypeCount).map(([name, value]) => ({ name, value }));

        const pieFormatted = [
          { name: "Active", value: activeAssets },
          { name: "Inactive", value: allAssets.length - activeAssets },
        ];
// console.log("Power Res:", powerRes.data, powerRes.data.totalPower);
        setCounts({
          clients: clientsRes.data.length,
          assets: allAssets.length,
          totalPower: powerRes.data.totalPower || 0,
          activeAssets: activeAssets,
          alerts: alerts,
          projects: projectsRes.data.length
        });

        setAssetTypeData(barFormatted);
        setPieData(pieFormatted);

      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className={styles.container}>
      <SideNavBar />
      <main className={styles.mainContent}>
        <Header />

        <section className={styles.topCards}>
          <div className={styles.card} onClick={() => navigate("/ClientListPage")}>
            <p>Total clients</p>
            <h2 className={styles.icons}><TeamOutlined /></h2>
            <h3>{counts.clients}</h3>
          </div>

          <div className={styles.card} onClick={() => navigate("/total-kwh")}>
            <p>Total KWhs</p>
            <h2 className={styles.icons}><ThunderboltOutlined /></h2>
            <h3>{counts.totalPower}</h3>
          </div>

          <div className={styles.card} onClick={() => navigate("/total-assets")}>
            <p>Total assets</p>
            <h2 className={styles.icons}><DatabaseOutlined /></h2>
            <h3>{counts.assets}</h3>
          </div>

          <div className={styles.card} onClick={() => navigate("/active-assets")}>
            <p>Active assets</p>
            <h2 className={styles.icons}><AccountBookOutlined /></h2>
            <h3>{counts.activeAssets}</h3>
          </div>


          <div className={styles.card} onClick={() => navigate("/MaintenanceAlertsPage")}>
            <p>Alerts/Notification</p>
            <h2 className={styles.icons}><ScheduleOutlined /></h2>
            <h3>{counts.alerts}</h3>
          </div>

          <div className={styles.card} onClick={() => navigate("/ProjectListPage")}>
            <p>Total projects</p>
            <h2 className={styles.icons}><ProjectOutlined /></h2>
            <h3>{counts.projects}</h3>
          </div>
        </section>

        <section className={styles.middleSection}>
          <div className={styles.chartBox}>
            <div className={styles.chartHeader}><p>Assets Overview</p></div>
            <PieChartComponent data={pieData} />
          </div>

          <div className={styles.chartBox}>
            <div className={styles.chartHeader}><p>Asset Types</p></div>
            <BarChartComponent data={assetTypeData} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
