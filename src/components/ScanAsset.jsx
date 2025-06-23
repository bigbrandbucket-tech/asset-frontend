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
      <p>
        <strong>{label}:</strong>{" "}
        <a
          href={filePath}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.documentLink}
        >
          View / Download
        </a>
      </p>
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

  const { type, makeOrOEM, assetName, model, tag, warrantyExpiryDate, location } = asset;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Asset Details</h2>

      <p><strong>Type:</strong> {type}</p>
      <p><strong>Manufacturer:</strong> {makeOrOEM}</p>
      <p><strong>Equipment Name:</strong> {assetName}</p>
      <p><strong>Model:</strong> {model}</p>
      <p><strong>Equipment Number:</strong> {tag}</p>
      <p><strong>Warranty Expiry Date:</strong> {formatDate(warrantyExpiryDate)}</p>
      <p><strong>Location:</strong> {location?.latitude || "N/A"}, {location?.longitude || "N/A"}</p>

      <h3 style={{ marginTop: "1.5rem" }}>Technical Documents</h3>
      {renderDocLink("GA Drawing", asset.ga)}
      {renderDocLink("Curve", asset.curve)}
      {renderDocLink("Performance", asset.performance)}
      {renderDocLink("Spares & Manuals", asset.spares)}

      <div className={styles.buttonContainer}>
        <button onClick={handlePrint} className={styles.printButton}>
          🖨️ Print Asset Details
        </button>
      </div>
    </div>
  );
};

export default ScanAsset;
