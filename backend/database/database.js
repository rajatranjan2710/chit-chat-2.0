import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv("../../.env");
const MONGO_URI = process.env.MONGO_URI;

const database = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log(error, "Error Connecting to database");
  }
};

export default database;
