import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import weatherRoutes from "./routes/weather";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all origins
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../../../../frontend/dist")));

// API routes
app.use("/weather", weatherRoutes);

// Serve index.html for all other routes (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../../frontend/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
