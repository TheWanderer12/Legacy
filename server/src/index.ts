import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import familyTreeRoutes from "./routes/familyTrees";

dotenv.config();
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("Mongo URI is not defined in the .env file");
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/family-trees", familyTreeRoutes);

// Start the server
const PORT: number = Number(process.env.PORT) || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
