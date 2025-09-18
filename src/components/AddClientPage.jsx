import { useState } from "react";
import SideNavBar from "./SideNavBar";
import styles from "./AddClientPage.module.css";
import Header from "./Header";
import axiosInstance from "../api/axiosAPI";

const AddClientPage = () => {
  const [form, setForm] = useState({
    clientName: "",
    pocName: "",
    pocNumber: "",
    email: "",
    address: "",
    username: "",
    password: ""
  });
const axios = axiosInstance();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/clients", form);
      alert("Client added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to add client.");
    }
  };

  return (
    <div className={styles.container}>
      <SideNavBar />
      <div className={styles.mainContent}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.headingWrapper}>
            <h2 className={styles.addClientHeading}>Add Client</h2>
          </div>

          <form className={styles.twoColumnForm} onSubmit={handleSubmit}>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="clientName">Client Name</label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="pocName">Contact POC Name</label>
                <input
                  type="text"
                  id="pocName"
                  name="pocName"
                  value={form.pocName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="pocNumber">Contact POC Number</label>
                <input
                  type="tel"
                  id="pocNumber"
                  name="pocNumber"
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  value={form.pocNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Add Client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClientPage;
