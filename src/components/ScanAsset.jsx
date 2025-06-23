import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ScanAsset = () => {
  const [searchParams] = useSearchParams();
  const assetId = searchParams.get("id");

  useEffect(() => {
    const fetchAsset = async () => {
      if (!assetId) {
        console.error("❌ No asset ID found in URL");
        return;
      }

      try {
        const res = await axios.get(`/assets/${assetId}`); // Uses axios.defaults.baseURL
        console.log("📦 Asset fetched from QR:", res.data);
      } catch (error) {
        console.error("❌ Failed to fetch asset", error);
      }
    };

    fetchAsset();
  }, [assetId]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Scanning Asset...</h2>
      <p>If data is not visible, check your console.</p>
    </div>
  );
};

export default ScanAsset;
