import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import AddClientPage from "./components/AddClientPage";
import AddAssetPage from "./components/AddAssetPage";
import AddUserPage from "./components/AddUserPage";
import TotalAssetsPage from "./components/TotalAssetsPage";
import ActiveAssetsPage from "./components/ActiveAssetsPage";
import MaintenanceAlertsPage from "./components/MaintenanceAlertsPage";
import ClientListPage from "./components/ClientListPage";
import UserListPage from "./components/UserListPage";
import ProjectListPage from "./components/ProjectListPage";
import AddProjectPage from "./components/AddProjectPage";
import ScanAsset from "./components/ScanAsset"; // ✅ QR Scan

import { ProjectProvider } from "./components/ProjectContext"; // ✅ Add this
import styles from "./App.module.css";

axios.defaults.baseURL = "https://asset-backend-tuna.onrender.com/api"; // ✅ Global API

const App = () => {
  return (
    <Router>
      <ProjectProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Admindashboard" element={<AdminDashboard />} />
          <Route path="/AddClientPage" element={<AddClientPage />} />
          <Route path="/AddAssetPage" element={<AddAssetPage />} />
          <Route path="/TotalClientsPage" element={<ClientListPage />} />
          <Route path="/total-assets" element={<TotalAssetsPage />} />
          <Route path="/active-assets" element={<ActiveAssetsPage />} />
          <Route path="/ClientListPage" element={<ClientListPage />} />
          <Route path="/ProjectListPage" element={<ProjectListPage />} />
          <Route path="/AddProjectPage" element={<AddProjectPage />} />
          <Route path="/AddUserPage" element={<AddUserPage />} />
          <Route path="/UserListPage" element={<UserListPage />} />
          <Route path="/MaintenanceAlertsPage" element={<MaintenanceAlertsPage />} />
          <Route path="/scan" element={<ScanAsset />} />
        </Routes>
      </ProjectProvider>
    </Router>
  );
};

export default App;
