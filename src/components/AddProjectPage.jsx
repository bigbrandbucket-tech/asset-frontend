import { useEffect, useState } from "react";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import styles from "./AddProjectPage.module.css";
import Header from "./Header";

const AddProjectPage = () => {
  const [form, setForm] = useState({
    projectName: "",
    client: "",
    pocName: "",
    pocNumber: "",
    email: "",
    address: "",
  });

  const [clients, setClients] = useState([]);

  // Fetch clients to populate dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("https://asset-backend-tuna.onrender.com/api/clients");
        setClients(res.data);
      } catch (err) {
        console.error("Error fetching clients:", err);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://asset-backend-tuna.onrender.com/api/projects", form);
      alert("Project added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Failed to add project:", err);
      alert("Failed to add project.");
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
            <h2 className={styles.addClientHeading}>Add Project</h2>
          </div>

          <form className={styles.twoColumnForm} onSubmit={handleSubmit}>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="client">Client Name</label>
                <select
                  id="client"
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Client --</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.clientName}
                    </option>
                  ))}
                </select>
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
            </div>

            <div className={styles.column}>
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
            </div>

            <button type="submit" className={styles.submitBtn}>
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPage;
