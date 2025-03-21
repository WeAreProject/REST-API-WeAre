import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar dotenv con la ruta absoluta
const envPath = path.join(__dirname, '../../.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

// Verificar que las variables de entorno se cargaron correctamente
const JWT_SECRET = process.env.JWT_SECRET || 'm1S3gr3t0JwT!!2397'; // Valor por defecto para desarrollo
console.log('JWT_SECRET loaded:', !!JWT_SECRET);

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

export const getCustomers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, full_name, email, username, image, created_at FROM customers");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error in getCustomers:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}; 

export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT id, full_name, email, username, image, created_at FROM customers WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error in getCustomerById:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM customers WHERE id = ?", [id]);
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.error("Error in deleteCustomer:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Verificar si el usuario es un cliente o un dueño
        let rows;
        let user;

        // Primero verificamos si es un cliente
        [rows] = await pool.query("SELECT * FROM customers WHERE email = ?", [email]);

        if (rows.length === 0) {
            // Si no es un cliente, verificamos si es un dueño
            [rows] = await pool.query("SELECT * FROM owners WHERE email = ?", [email]);

            if (rows.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            user = rows[0];
            user.role = "owner"; // Añadir el rol al objeto de usuario
        } else {
            user = rows[0];
            user.role = "customer"; // Añadir el rol al objeto de usuario
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Crear el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            image: user.image,
            role: user.role,
            token,
            message: "Login successful",
        });

    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
