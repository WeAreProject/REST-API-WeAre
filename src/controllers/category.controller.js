import { pool } from "../db.js";

export const getCategories = async (req, res) => {
    try {
        const [businessCategories] = await pool.query("SELECT DISTINCT category FROM businesses");
        const [serviceCategories] = await pool.query("SELECT DISTINCT category FROM services");

        const categories = [...new Set([...businessCategories.map(c => c.category), ...serviceCategories.map(c => c.category)])];

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error in getCategories:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const getBusinessesAndServicesByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const [businesses] = await pool.query("SELECT * FROM businesses WHERE category = ?", [category]);
        const [services] = await pool.query("SELECT * FROM services WHERE category = ?", [category]);

        res.status(200).json({ businesses, services });
    } catch (error) {
        console.error("Error in getBusinessesAndServicesByCategory:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};