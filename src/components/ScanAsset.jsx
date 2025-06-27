import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from "./ScanAsset.module.css";

const ScanAsset = () => {
  const [searchParams] = useSearchParams();
  const assetId = searchParams.get("id");
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      if (!assetId) {
        setError("❌ No asset ID found in URL");
        return;
      }

      try {
        const res = await axios.get(`/assets/${assetId}`);
        setAsset(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch asset", err);
        setError("Asset not found or failed to load.");
      }
    };

    fetchAsset();
  }, [assetId]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toDateString() : "N/A";
  };

  const renderDocLink = (label, filePath) => {
    if (!filePath) return null;
    return (
      <div className={styles.field}>
        <span className={styles.label}>{label}:</span>
        <a
          href={filePath}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.documentLink}
        >
          View / Download
        </a>
      </div>
    );
  };

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className={styles.loading}>
        <h2>Loading Asset...</h2>
      </div>
    );
  }

  const {
    type,
    makeOrOEM,
    assetName,
    model,
    tag,
    warrantyExpiryDate,
    location,
    qrCodeUrl,
    gaDocumentUrl,
    curveDocumentUrl,
    performanceDocumentUrl,
    sparesManualsUrl
  } = asset;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Asset Details</h2>

      <div className={styles.section}>
        <div className={styles.field}>
          <span className={styles.label}>Type:</span>
          <span className={styles.value}>{type}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Manufacturer:</span>
          <span className={styles.value}>{makeOrOEM}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Equipment Name:</span>
          <span className={styles.value}>{assetName}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Model:</span>
          <span className={styles.value}>{model}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Equipment Number:</span>
          <span className={styles.value}>{tag}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Warranty Expiry:</span>
          <span className={styles.value}>{formatDate(warrantyExpiryDate)}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Location:</span>
          <span className={styles.value}>
            {location?.latitude || "N/A"}, {location?.longitude || "N/A"}
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Technical Documents</h3>
        {renderDocLink("GA Drawing", gaDocumentUrl)}
        {renderDocLink("Curve", curveDocumentUrl)}
        {renderDocLink("Performance", performanceDocumentUrl)}
        {renderDocLink("Spares & Manuals", sparesManualsUrl)}
      </div>

      {/* ✅ QR Code Section */}
      {qrCodeUrl && (
        <div className={styles.section}>
          <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>QR Code</h3>
          <img
            src={qrCodeUrl}
            alt="QR Code"
            style={{ width: "200px", padding: "8px", background: "#fff", border: "1px solid #ccc" }}
          />
          <div style={{ marginTop: "0.5rem" }}>
            <a href={qrCodeUrl} download={`${assetName}-qr.png`}>
              <button className={styles.downloadBtn}>Download QR</button>
            </a>
            <button
              className={styles.viewBtn}
              style={{ marginLeft: "10px" }}
              onClick={() => window.open(qrCodeUrl, "_blank")}
            >
              👁️ View
            </button>
          </div>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button onClick={handlePrint} className={styles.printButton}>
          🖨️ Print Asset Details
        </button>
      </div>
    </div>
  );
};

export default ScanAsset;
