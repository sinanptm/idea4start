import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGODB_URI || "";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const CLIENT = process.env.CLIENT_URL || "http://localhost:3000";
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "";