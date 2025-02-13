import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "services", // Nombre de la carpeta en Cloudinary
    format: async (req, file) => "png", // Formato de imagen
    public_id: (req, file) => file.originalname.split(".")[0], // Nombre del archivo
  },
});

const upload = multer({ storage });

export default upload;
