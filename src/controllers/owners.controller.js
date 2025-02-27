import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "../db.js";

dotenv.config();

export const registerOwner = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image upload failed" });
      }
      const { name, email, password, phone } = req.body;
      const imageUrl = req.file ? req.file.path || req.file.url : null;
  
      if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const [rows] = await pool.query(
        "INSERT INTO owners (name, email, password, phone, image) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashedPassword, phone, imageUrl]
      );
  
      res.status(201).json({
        id: rows.insertId,
        name,
        email,
        phone,
        image: imageUrl,
        message: "Owner registered successfully",
      });
    } catch (error) {
      console.error("Error in registerOwner:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  

