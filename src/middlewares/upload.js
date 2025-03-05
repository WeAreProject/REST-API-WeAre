import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const serviceStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "services",
    format: async (req, file) => file.mimetype.split("/")[1],
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const uploadServiceImage = multer({ storage: serviceStorage });

const ownerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "owners",
    format: async (req, file) => file.mimetype.split("/")[1],
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const uploadOwnerImage = multer({ storage: ownerStorage });

export { uploadServiceImage, uploadOwnerImage };
