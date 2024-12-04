import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Resolve the __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../.env') });

console.log("MongoDB URI from .env:", process.env.MONGO_URI); // Debug log

// MongoDB connection function
export const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        console.log("Connecting to MongoDB...");
        console.log("Connecting with URI:", mongoUri); // Debug log

        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 70000,
            socketTimeoutMS: 45000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

