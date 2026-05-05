import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "chat-images",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [{ width: 800, height: 600, crop: "limit" }, { quality: "any" }],
    } as any
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5 mb = 5 * 1024kb * 1024byte
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image is allowed"))
        }
    }
})