import { pool } from "../db.js";

export const registerPurchase = async (req, res) => {
    try {
        const { customer_id, service_id, business_id, price } = req.body;

        if (!customer_id || !service_id || !business_id || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [rows] = await pool.query(
            "INSERT INTO service_orders (customer_id, service_id, business_id, status, price) VALUES (?, ?, ?, 'pending', ?)",
            [customer_id, service_id, business_id, price]
        );

        res.status(201).json({
            id: rows.insertId,
            customer_id,
            service_id,
            business_id,
            status: "pending",
            price,
            message: "Purchase registered successfully",
        });
    } catch (error) {
        console.error("Error in registerPurchase:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


// Obtener todas las compras de un cliente por customer_id
export const getPurchasesByCustomer = async (req, res) => {
    try {
        const { customer_id } = req.params;

        const [rows] = await pool.query(
            "SELECT * FROM service_orders WHERE customer_id = ?",
            [customer_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No purchases found for this customer" });
        }

        res.json(rows);
    } catch (error) {
        console.error("Error in getPurchasesByCustomer:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


// Obtener todas las compras de un negocio por business_id
export const getPurchasesByBusiness = async (req, res) => {
    try {
        const { business_id } = req.params;

        const [rows] = await pool.query(
            "SELECT * FROM service_orders WHERE business_id = ?",
            [business_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No purchases found for this business" });
        }

        res.json(rows);
    } catch (error) {
        console.error("Error in getPurchasesByBusiness:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// Eliminar una compra por order_id
export const deletePurchase = async (req, res) => {
    try {
        const { order_id } = req.params;

        const [result] = await pool.query(
            "DELETE FROM service_orders WHERE id = ?",
            [order_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.json({ message: "Purchase deleted successfully" });
    } catch (error) {
        console.error("Error in deletePurchase:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};



// Actualizar el estado de una compra
export const updatePurchaseStatus = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { status } = req.body;

        // Estados válidos
        const validStatuses = ["pending", "ongoing", "completed", "canceled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const [result] = await pool.query(
            "UPDATE service_orders SET status = ? WHERE id = ?",
            [status, order_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.json({ message: "Purchase status updated successfully", status });
    } catch (error) {
        console.error("Error in updatePurchaseStatus:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};