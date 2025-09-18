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
import ScanAsset from "./components/ScanAsset";

import { ProjectProvider } from "./components/ProjectContext";
import ProtectedRoute from "./components/ProtectedRoute";

axios.defaults.baseURL = window.location.href==="localhost"?"http://localhost:5000/api":"https://asset-backend-one.vercel.app/api";

const App = () => {
  return (
    <Router>
      <ProjectProvider>
        <Routes>
          {/* 🔓 Public Login Page (for both Admin and Client) */}
          <Route path="/" element={<LoginPage />} />

          {/* 🔒 All Protected Routes */}
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddClientPage"
            element={
              <ProtectedRoute>
                <AddClientPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddAssetPage"
            element={
              <ProtectedRoute>
                <AddAssetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/TotalClientsPage"
            element={
              <ProtectedRoute>
                <ClientListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/total-assets"
            element={
              <ProtectedRoute>
                <TotalAssetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/active-assets"
            element={
              <ProtectedRoute>
                <ActiveAssetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ClientListPage"
            element={
              <ProtectedRoute>
                <ClientListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProjectListPage"
            element={
              <ProtectedRoute>
                <ProjectListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddProjectPage"
            element={
              <ProtectedRoute>
                <AddProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddUserPage"
            element={
              <ProtectedRoute>
                <AddUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserListPage"
            element={
              <ProtectedRoute>
                <UserListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MaintenanceAlertsPage"
            element={
              <ProtectedRoute>
                <MaintenanceAlertsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan"
            element={
              <ProtectedRoute>
                <ScanAsset />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </ProjectProvider>
    </Router>
  );
};

export default App;
