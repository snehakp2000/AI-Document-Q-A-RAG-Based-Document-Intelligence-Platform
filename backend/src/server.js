import "dotenv/config";

import express from "express";
import connectDB from "./config/database.js";
import { authRoutes } from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import cors from 'cors';


const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Document Q&A Backend is Running"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/documents", documentRoutes);

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});