import mongoose from "mongoose";
import dotenv from "dotenv";
import FamilyTree from "../src/models/FamilyTree";
import couple from "../../src/data/couple.json"; // Adjust path to your JSON file

dotenv.config();

(async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("Mongo URI is not defined in .env file");
    }

    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB");

    const tree = new FamilyTree({ members: couple });
    await tree.save();

    console.log("Data imported successfully");
    process.exit();
  } catch (err) {
    console.error("Error importing data:", err.message);
    process.exit(1);
  }
})();
