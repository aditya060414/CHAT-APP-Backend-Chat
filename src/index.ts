import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";
import { app, server } from "./config/socket.js";

dotenv.config();

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/v1/chat", chatRoutes);



server.listen(process.env.PORT, () => {
  console.log(`Chat service is running on port ${process.env.PORT}`);
});
