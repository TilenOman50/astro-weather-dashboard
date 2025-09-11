import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather";

dotenv.config();

const app = express();
const PORT = 4000;

app.use("/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
