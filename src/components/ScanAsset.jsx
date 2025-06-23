import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ScanAsset = () => {
  const [searchParams] = useSearchParams();
  const [asset, setAsset] = useState(null);
  const assetId = searchParams.get("id");
  const printRef = useRef();

  useEffect(() => {
    const fetchAsset = async () => {
      if (!assetId) return;
      try {
        const res = await axios.get(
          `https://asset-backend-tuna.onrender.com/api/assets/${assetId}`
        );
        setAsset(res.data);
      } catch (error) {
        console.error("Failed to fetch asset:", error);
      }
    };
    fetchAsset();
  }, [assetId]);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const win = window.open("", "", "width=800,height=600");
      win.document.write(`<html><head><title>Print</title></head><body>${printContents}</body></html>`);
      win.document.close();
      win.focus();
      win.print();
      win.close();
    }
  };

  if (!asset) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading asset data...</div>;
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      padding: "2rem",
      background: "#f9f9f9",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div
        ref={printRef}
        style={{
          background: "#fff",
          padding: "2rem 3rem",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
          📋 Asset Details
        </h2>

        <div style={{ lineHeight: "2", color: "#444" }}>
          <p><strong>Type:</strong> {asset.type}</p>
          <p><strong>Manufacturer:</strong> {asset.makeOrOEM}</p>
          <p><strong>Equipment Name:</strong> {asset.assetName}</p>
          <p><strong>Model:</strong> {asset.model}</p>
          <p><strong>Equipment Number:</strong> {asset.tag}</p>
          <p><strong>Warranty Expiry Date:</strong> {new Date(asset.warrantyExpiryDate).toDateString()}</p>
          <p><strong>Location:</strong> {asset.latitude}, {asset.longitude}</p>
        </div>

        <hr style={{ margin: "2rem 0", borderTop: "1px solid #ccc" }} />

        <h3 style={{ marginBottom: "1rem", color: "#333" }}>📎 Technical Documents</h3>
        <ul style={{ paddingLeft: "1.5rem" }}>
          {asset.ga && <li><a href={asset.ga} target="_blank" rel="noreferrer">GA Drawing</a></li>}
          {asset.curve && <li><a href={asset.curve} target="_blank" rel="noreferrer">Curve</a></li>}
          {asset.performance && <li><a href={asset.performance} target="_blank" rel="noreferrer">Performance</a></li>}
          {asset.spares && <li><a href={asset.spares} target="_blank" rel="noreferrer">Spares & Manuals</a></li>}
        </ul>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 25px",
              border: "none",
              borderRadius: "6px",
              fontSize: "15px",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
          >
            🖨️ Print Asset Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanAsset;
