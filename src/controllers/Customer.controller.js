import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "../db.js";

dotenv.config();

export const registerCustomer = async (req, res ) =>{
    try {
        if (!req.file){
            return res.status(400).json({message: "Image upload failed"});
        }
        const {full_name, email, username, password} = req.body;
        const imageUrl = req.file ? req.file.path || req.file.url : null;

        if(!full_name || !email || !username || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const [rows] = await pool.query(
            "INSERT INTO customers (full_name, email, username, password, image) VALUES (?,?,?,?,?)",
            [full_name, email, username, hashedPassword, imageUrl]
        );

        res.status(201).json({
            id: rows.insertId,
            full_name,
            email,
            username,
            image: imageUrl,
            message: "Customer registered seccessfully"
        })
    } catch (error) {
        console.error("Error in registerCustomer:", error);
        return res.status(500).json ({message: " Something went wrong"});
        
    }
;}
   