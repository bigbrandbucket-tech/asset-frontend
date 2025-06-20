import { useEffect, useState } from "react";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import Header from "./Header";
import styles from "./AddUserPage.module.css"; 

const AddUserPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    assignedProject: "",
  });

  const [projects, setProjects] = useState([]);

  // Fetch projects for dropdown
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users", form);
      alert("User added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Failed to add user:", err);
      alert("Failed to add user.");
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
            <h2 className={styles.addClientHeading}>Add User</h2>
          </div>

          <form className={styles.twoColumnForm} onSubmit={handleSubmit}>
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
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
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
                />
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="role">Role</label>
                <input
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                
                  
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="assignedProject">Assigned Project</label>
                <select
                  id="assignedProject"
                  name="assignedProject"
                  value={form.assignedProject}
                  onChange={handleChange}
                >
                  <option value="">-- Select Project --</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
