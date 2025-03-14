import { pool } from "../db.js";

export const registerBusiness = async (req, res) => {
    try {
      if (!req.files || !req.files.image || !req.files.professional_license) {
        return res.status(400).json({ message: "File upload failed" });
      }
  
      const {
        owner_id,
        business_name,
        category,
        description,
        email,
        phone,
        location,
        operation_hours,
        social_media_links,
        tax_id,
      } = req.body;
  
      const imageUrl = req.files.image[0].path;
      const professionalLicenseUrl = req.files.professional_license[0].path; 
  
      console.log("Image URL:", imageUrl);  
      console.log("Professional License URL:", professionalLicenseUrl);  
  
      if (
        !owner_id ||
        !business_name ||
        !category ||
        !description ||
        !email ||
        !phone ||
        !location ||
        !operation_hours
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const [rows] = await pool.query(
        "INSERT INTO businesses (owner_id, business_name, category, description, email, phone, location, operation_hours, social_media_links, tax_id, professional_license, image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          owner_id,
          business_name,
          category,
          description,
          email,
          phone,
          location,
          operation_hours,
          JSON.stringify(social_media_links),
          tax_id,
          professionalLicenseUrl, 
          imageUrl, 
        ]
      );
  
      res.status(201).json({
        id: rows.insertId,
        owner_id,
        business_name,
        category,
        description,
        email,
        phone,
        location,
        operation_hours,
        social_media_links,
        tax_id,
        professional_license: professionalLicenseUrl,
        image: imageUrl,
        message: "Business registered successfully",
      });
    } catch (error) {
      console.error("Error in registerBusiness:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };