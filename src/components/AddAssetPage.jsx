import React, { useState } from "react";
import axios from "axios";
import styles from "./AddAssetPage.module.css";
import SideNavBar from "./SideNavBar";
import Header from "./Header";

const AddAssetPage = () => {
  const [form, setForm] = useState({
    type: "",
    makeOrOEM: "",
    assetName: "",
    model: "",
    tag: "",
    warrantyExpiryDate: ""
  });

  const [files, setFiles] = useState({
    ga: null,
    curve: null,
    performance: null,
    spares: null,
    image: null
  });

  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newManufacturer, setNewManufacturer] = useState("");

  const [manufacturers, setManufacturers] = useState({
    electrical: ["Siemens", "Schneider", "ABB"],
    fire: ["Tyco", "Honeywell", "Viking"],
    hvac: ["Daikin", "Voltas", "Blue Star"],
    plumbing: ["Jaquar", "Hindware", "Kohler"]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const res = await axios.post(
        "https://asset-backend-tuna.onrender.com/api/assets/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Asset uploaded successfully!");
      setQrCodeUrl(res.data.qrCode);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  const handleAddManufacturer = () => {
    if (newManufacturer && form.type) {
      setManufacturers((prev) => ({
        ...prev,
        [form.type]: [...(prev[form.type] || []), newManufacturer]
      }));
      setForm({ ...form, makeOrOEM: newManufacturer });
      setNewManufacturer("");
      setShowModal(false);
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
            <h2 className={styles.addClientHeading}>Add Asset</h2>
          </div>

          <form className={styles.twoColumnForm} onSubmit={handleSubmit}>
            {/* Left Column */}
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Type --</option>
                  <option value="electrical">Electrical</option>
                  <option value="fire">Fire Fighting</option>
                  <option value="hvac">HVAC</option>
                  <option value="plumbing">Plumbing</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="makeOrOEM">OEM / Manufacturer</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <select
                    id="makeOrOEM"
                    name="makeOrOEM"
                    value={form.makeOrOEM}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Manufacturer --</option>
                    {manufacturers[form.type]?.map((mfr, idx) => (
                      <option key={idx} value={mfr}>
                        {mfr}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setShowModal(true)}>+</button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="assetName">Equipment Name</label>
                <input type="text" name="assetName" value={form.assetName} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="model">Model</label>
                <input type="text" name="model" value={form.model} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="tag">Equipment Number</label>
                <input type="text" name="tag" value={form.tag} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="warrantyExpiryDate">Warranty Expiry Date</label>
                <input type="date" name="warrantyExpiryDate" value={form.warrantyExpiryDate} onChange={handleChange} required />
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label className={styles.sectionLabel}>Technical Datasheets</label>

                <label htmlFor="ga">Upload GA Drawing</label>
                <input type="file" name="ga" accept=".pdf,.dwg,.jpg,.png" onChange={handleFileChange} />

                <label htmlFor="curve">Upload Curve</label>
                <input type="file" name="curve" accept=".pdf,.jpg,.png" onChange={handleFileChange} />

                <label htmlFor="performance">Upload Performance</label>
                <input type="file" name="performance" accept=".pdf,.xls,.xlsx" onChange={handleFileChange} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="spares">Upload Spares & Manuals</label>
                <input type="file" name="spares" accept=".pdf,.doc,.docx,.zip" onChange={handleFileChange} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="image">Upload Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>Add Asset</button>
          </form>

          {/* QR Code Section */}
          {qrCodeUrl && (
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <h3>QR Code for Asset</h3>
              <img
                src={qrCodeUrl}
                alt="Asset QR Code"
                style={{ width: "200px", padding: "8px", background: "#fff", border: "1px solid #ccc" }}
              />
              <br />
              <a href={qrCodeUrl} download="asset_qrcode.png">
                <button
                  style={{
                    marginTop: "1rem",
                    padding: "10px 20px",
                    fontSize: "14px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Download QR Code
                </button>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Add New Manufacturer</h3>
            <label>
              Type: <strong>{form.type}</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Manufacturer Name"
              value={newManufacturer}
              onChange={(e) => setNewManufacturer(e.target.value)}
            />
            <div className={styles.modalButtons}>
              <button className={styles.saveBtn} onClick={handleAddManufacturer}>Save</button>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAssetPage;
