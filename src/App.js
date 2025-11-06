import React, { useState } from "react";
import { CloudUpload } from "lucide-react";

const API_BASE = "http://localhost:8000"; // Change this to your deployed backend URL

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
    setStatus("");
    setDownloadUrl("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setStatus("⚠️ Please select a file.");

    try {
      setLoading(true);
      setStatus("Requesting upload URL...");
      const presignResp = await fetch(`${API_BASE}/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          content_type: file.type,
          filesize: file.size,
        }),
      });

      const presignData = await presignResp.json();

      const formData = new FormData();
      Object.entries(presignData.fields).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("file", file);

      setStatus("Uploading to S3...");
      const upload = await fetch(presignData.url, { method: "POST", body: formData });
      if (!upload.ok) throw new Error("Upload failed");

      const logResp = await fetch(`${API_BASE}/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          object_key: presignData.object_key,
          filename: file.name,
          content_type: file.type,
          filesize: file.size,
        }),
      });

      const logData = await logResp.json();
      setDownloadUrl(logData.download_url);
      setStatus("✅ Upload successful!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <CloudUpload size={60} color="#2563eb" />
        <h2 style={styles.title}>Cloud File Upload</h2>

        {preview && (
          <img src={preview} alt="preview" style={styles.preview} />
        )}

        <form onSubmit={handleUpload} style={styles.form}>
          <input type="file" onChange={handleFileChange} style={styles.fileInput} />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {status && <p style={styles.status}>{status}</p>}

        {downloadUrl && (
          <a href={downloadUrl} target="_blank" rel="noreferrer" style={styles.link}>
            🔗 View Uploaded File
          </a>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(to right, #93c5fd, #3b82f6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "400px",
  },
  title: {
    color: "#1e3a8a",
    marginBottom: "20px",
  },
  fileInput: {
    margin: "15px 0",
  },
  button: {
    padding: "10px 25px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  preview: {
    maxWidth: "100%",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  status: {
    marginTop: "15px",
    fontWeight: "bold",
  },
  link: {
    display: "block",
    marginTop: "10px",
    textDecoration: "none",
    color: "#1d4ed8",
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default App;
