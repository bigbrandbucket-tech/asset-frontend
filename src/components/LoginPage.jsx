import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import axiosInstance from "../api/axiosAPI";

const LoginPage = () => {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const axios = axiosInstance();
  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint =
      role === "admin"
        ? "/users/login"
        : "/clients/login";

    try {
      await axios.post(endpoint, { username, password });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);

      alert("Login successful!");
      navigate("/AdminDashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.loginContainer2}>
        <img src="/logo-for-login-page.jpg" className={styles.sideImage} alt="login visual" />
      </div>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginHeading}>Please Login!</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="role">Login as</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.dropdown}
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <a href="#" className={styles.forgotPassword}>
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
