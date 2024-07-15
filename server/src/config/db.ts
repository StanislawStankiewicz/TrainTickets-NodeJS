import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.error(
      "Error: MONGO_URI is not defined in the environment variables."
    );
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
