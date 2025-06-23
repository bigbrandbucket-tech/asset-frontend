import { useState } from "react";
import axios from "axios";
import styles from "./AddAssetPage.module.css";
import SideNavBar from "./SideNavBar";
import Header from "./Header";

const AddAssetPage = () => {
  const [form, setForm] = useState({
    assetName: "",
    type: "",
    tag: "",
    service: "",
    location: "",
    repPhone: "",
    model: "",
    makeOrOEM: "",
    notes: "",
    warrantyExpiryDate: ""
  });

  const [files, setFiles] = useState({
    image: null,
    ga: null,
    tds: null,
    spares: null
  });

  const [qrCodeUrl, setQrCodeUrl] = useState(""); // ✅ QR Code state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("assetName", form.assetName);
    formData.append("type", form.type);
    formData.append("tag", form.tag);
    formData.append("service", form.service);
    formData.append("location", form.location);
    formData.append("repPhone", form.repPhone);
    formData.append("model", form.model);
    formData.append("makeOrOEM", form.makeOrOEM);
    formData.append("notes", form.notes);
    formData.append("warrantyExpiryDate", form.warrantyExpiryDate);

    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const res = await axios.post(
        "https://asset-backend-tuna.onrender.com/api/assets/upload", // ✅ Use Render backend here
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Asset uploaded successfully!");
      setQrCodeUrl(res.data.qrCode); // ✅ Get QR from backend response
      console.log("QR Code URL:", res.data.qrCode);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
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
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="assetName">Asset Name</label>
                <input
                  type="text"
                  id="assetName"
                  name="assetName"
                  value={form.assetName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="type">Type</label>
                <select id="type" name="type" onChange={handleChange} required>
                  <option value="">-- Select Type --</option>
                  <option value="hvac">HVAC</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="firefighting">Fire Fighting</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="tag">Tag/Equip No.</label>
                <input type="text" id="tag" name="tag" onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="service">Service</label>
                <input type="text" id="service" name="service" onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.sectionLabel}>Technical Data</label>

                <label htmlFor="ga">Upload GA</label>
                <input type="file" id="ga" name="ga" accept=".pdf,.dwg,.jpg,.png" onChange={handleFileChange} />

                <label htmlFor="tds">Upload TDS</label>
                <input type="file" id="tds" name="tds" accept=".pdf,.xls,.xlsx,.doc,.docx" onChange={handleFileChange} />

                <label htmlFor="spares">Upload Spares & Manuals</label>
                <input type="file" id="spares" name="spares" accept=".pdf,.doc,.docx,.zip" onChange={handleFileChange} />
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="repPhone">Rep/Phone</label>
                <input type="text" id="repPhone" name="repPhone" onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="model">Model</label>
                <input type="text" id="model" name="model" onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="makeOrOEM">MAKE / OEM</label>
                <input type="text" id="makeOrOEM" name="makeOrOEM" onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="warrantyExpiryDate">Warranty Expiry Date</label>
                <input
                  type="date"
                  id="warrantyExpiryDate"
                  name="warrantyExpiryDate"
                  value={form.warrantyExpiryDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="image">Upload Image</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>Add Asset</button>
          </form>

          {/* ✅ QR Code Preview & Download Section */}
          {qrCodeUrl && (
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <h3>QR Code for Asset</h3>
              <img
                src={qrCodeUrl}
                alt="Asset QR Code"
                style={{ width: "200px", padding: "8px", background: "#fff", border: "1px solid #ccc" }}
              />
              <br />
              <a href={qrCodeUrl} download={`asset_qrcode.png`}>
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
    </div>
  );
};

export default AddAssetPage;
