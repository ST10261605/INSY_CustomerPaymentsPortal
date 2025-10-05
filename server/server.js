import https from "https";
import fs from "fs";
import dotenv from "dotenv";
import app from "./app.js";
import express from "express";
import authRoutes from "./routes/authRoutes.js"; 

dotenv.config();

app.use(express.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
const options = {
  key: fs.readFileSync("./ssl/privatekey.pem"),
  cert: fs.readFileSync("./ssl/certificate.pem")
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Secure backend running at https://localhost:${PORT}`);
});
