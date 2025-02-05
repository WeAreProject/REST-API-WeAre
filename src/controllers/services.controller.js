import { pool } from "../db.js";

export const getServices = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};

export const getService = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services WHERE id = ? ", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "service not found",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};

export const createService = async (req, res) => {
  const { name, description } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO services (name, description) VALUES (?,?)",
      [name, description]
    );
    res.send({
      id: rows.insertId,
      name,
      description,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};

export const deleteServices = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM services Where id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Service not found",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const [result] = await pool.query(
      " UPDATE services SET name= IFNULL(?, name), description = IFNULL(?, description) WHERE id = ?",
      [name, description, id]
    );

    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: " Service not found",
      });

    const [rows] = await pool.query("SELECT * FROM services WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "something goes wrong",
    });
  }
};
