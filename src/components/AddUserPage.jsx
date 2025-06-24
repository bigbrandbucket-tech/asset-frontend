import { useEffect, useState } from "react";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import Header from "./Header";
import styles from "./AddUserPage.module.css";
import { useProject } from "./ProjectContext"; // <-- Context for project

const AddUserPage = () => {
  const { selectedProject } = useProject(); // <-- Global selected project
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    role: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProject) {
      alert("Please select a project from the dropdown in header first.");
      return;
    }

    try {
      const payload = {
        ...form,
        assignedProject: selectedProject
      };

      const res = await axios.post(
        "https://asset-backend-tuna.onrender.com/api/users",
        payload
      );

      alert("User added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Failed to add user:", err);
      alert("Failed to add user.");
    }
  };

  const isFormDisabled = !selectedProject;

  return (
    <div className={styles.container}>
      <SideNavBar />
      <div className={styles.mainContent}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.headingWrapper}>
            <h2 className={styles.addClientHeading}>Add User</h2>
          </div>

          <form className={styles.twoColumnForm} onSubmit={handleSubmit}>
            {/* Left Column */}
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  disabled={isFormDisabled}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  disabled={isFormDisabled}
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isFormDisabled}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
