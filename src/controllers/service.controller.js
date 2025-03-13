import { pool } from "../db.js";

export const registerService = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "File upload failed" });
        }

        const { business_id, service_name, category, price, description } = req.body;
        const imageUrl = req.files.image[0].path;

        if (!business_id || !service_name || !category || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [rows] = await pool.query(
            "INSERT INTO services (business_id, service_name, category, price, description, image) VALUES (?, ?, ?, ?, ?, ?)",
            [business_id, service_name, category, price, description, imageUrl]
        );

        res.status(201).json({
            id: rows.insertId,
            business_id,
            service_name,
            category,
            price,
            description,
            image: imageUrl,
            message: "Service registered successfully",
        });
    } catch (error) {
        console.error("Error in registerService:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


// Obtener todos los servicios
export const getAllServices = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM services");
        res.json(rows);
    } catch (error) {
        console.error("Error in getAllServices:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


// Obtener un servicio por ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM services WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error in getServiceById:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};