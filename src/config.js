import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "hacepassword";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_DATABASE = process.env.DB_DATABASE || "wearedb";
export const DB_PORT = process.env.DB_PORT || 3306;



export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;