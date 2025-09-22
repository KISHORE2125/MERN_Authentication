import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
