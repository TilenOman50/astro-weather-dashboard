import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // <-- import cors
import weatherRoutes from "./routes/weather";

dotenv.config();

const app = express();
const PORT = 4000;

// Enable CORS for all origins
app.use(cors());

app.use("/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
