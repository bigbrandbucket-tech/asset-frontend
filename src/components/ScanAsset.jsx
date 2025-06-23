import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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
        const res = await axios.get(`/assets/${assetId}`); // Uses axios.defaults.baseURL
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

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!asset) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading Asset...</h2>
      </div>
    );
  }

  const { type, makeOrOEM, assetName, model, tag, warrantyExpiryDate, location } = asset;

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toDateString() : "N/A";
  };

  const renderDocLink = (label, filePath) => {
    if (!filePath) return null;
    return (
      <p>
        <strong>{label}:</strong>{" "}
        <a href={filePath} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff" }}>
          View / Download
        </a>
      </p>
    );
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>Asset Details</h2>

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

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handlePrint}
          style={{
            padding: "10px 20px",
            fontSize: "14px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          🖨️ Print Asset Details
        </button>
      </div>
    </div>
  );
};

export default ScanAsset;
