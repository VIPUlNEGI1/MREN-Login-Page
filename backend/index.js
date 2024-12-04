import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { connectDb } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { EventEmitter } from 'events';
import path from 'path';
EventEmitter.defaultMaxListeners = 15;
dotenv.config();

console.log("PORT:", process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI); // Debug

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);



// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const startServer = async () => {
    try {
        await connectDb(); // Connect to MongoDB
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
        process.exit(1);
    }
};

startServer();
