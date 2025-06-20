import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./LoginPage.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let actualUsername = "testatom";
  let actualPassword = "testatom";

  const handleLogin = (e) => {
    e.preventDefault();
    if (username == actualUsername && password == actualPassword) {
      navigate("/AdminDashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.loginContainer2}>
          <img src="/logo-for-login-page.jpg" className={styles.sideImage} />
        </div>
        <div className={styles.loginContainer}>
          <h2 className={styles.loginHeading}>Please Login!</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
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
    </>
  );
};

export default Login;
