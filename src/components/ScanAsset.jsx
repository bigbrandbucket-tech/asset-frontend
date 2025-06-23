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
        setError("Failed to load asset. Please try again.");
      }
    };

    fetchAsset();
  }, [assetId]);

  if (error) {
    return <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>{error}</div>;
  }

  if (!asset) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading asset details...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Asset Details</h2>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Type:</strong> {asset.type}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Manufacturer:</strong> {asset.makeOrOEM}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Equipment Name:</strong> {asset.assetName}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Model:</strong> {asset.model}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Equipment Number:</strong> {asset.tag}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Warranty Expiry Date:</strong> {new Date(asset.warrantyExpiryDate).toDateString()}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Location:</strong> Latitude {asset.latitude}, Longitude {asset.longitude}
      </div>

      {asset.image && (
        <div style={{ marginBottom: "1.5rem" }}>
          <img
            src={asset.image}
            alt="Asset"
            style={{ width: "300px", maxHeight: "300px", objectFit: "cover", border: "1px solid #ccc", padding: "8px" }}
          />
        </div>
      )}

      <div>
        <h4>Technical Documents</h4>
        <ul>
          {asset.ga && (
            <li>
              <a href={asset.ga} target="_blank" rel="noopener noreferrer">Download GA Drawing</a>
            </li>
          )}
          {asset.curve && (
            <li>
              <a href={asset.curve} target="_blank" rel="noopener noreferrer">Download Curve</a>
            </li>
          )}
          {asset.performance && (
            <li>
              <a href={asset.performance} target="_blank" rel="noopener noreferrer">Download Performance Sheet</a>
            </li>
          )}
          {asset.spares && (
            <li>
              <a href={asset.spares} target="_blank" rel="noopener noreferrer">Download Spares & Manuals</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ScanAsset;
