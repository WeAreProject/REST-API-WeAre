import { pool } from "../db.js";

export const registerReview = async (req, res) => {
    try {
        const { business_id, reviewer_id, reviewer_type, rating, review_text } = req.body;

        // Validación de campos obligatorios
        if (!business_id || !reviewer_id || !reviewer_type || !rating || !review_text) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validación de que `reviewer_type` sea correcto
        if (reviewer_type !== "customer" && reviewer_type !== "owner") {
            return res.status(400).json({ message: "Invalid reviewer type" });
        }

        // Validación de que `rating` esté entre 1 y 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const [rows] = await pool.query(
            "INSERT INTO reviews (business_id, reviewer_id, reviewer_type, rating, review_text) VALUES (?, ?, ?, ?, ?)",
            [business_id, reviewer_id, reviewer_type, rating, review_text]
        );

        res.status(201).json({
            id: rows.insertId,
            business_id,
            reviewer_id,
            reviewer_type,
            rating,
            review_text,
            message: "Review registered successfully",
        });
    } catch (error) {
        console.error("Error in registerReview:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const getReviewsByBusiness = async (req, res) => {
    try {
        const { business_id } = req.params;

        if (!business_id) {
            return res.status(400).json({ message: "Business ID is required" });
        }

        const [rows] = await pool.query(
            "SELECT * FROM reviews WHERE business_id = ?",
            [business_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No reviews found for this business" });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error in getReviewsByBusiness:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
