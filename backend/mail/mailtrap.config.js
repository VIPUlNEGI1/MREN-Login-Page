import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Mailtrap client
export const mailtrapClient = new MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT,
    token: process.env.MAILTRAP_TOKEN,
});

// Sender information
export const sender = {
    email: "hello@demomailtrap.com",
    name: "Vipul negi",
};
