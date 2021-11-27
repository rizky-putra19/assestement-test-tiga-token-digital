const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

module.exports = (fieldName) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "picture"
        }
        })
    
        const upload = multer({ storage: storage }).single(fieldName)

    return (req, res, next) => {
        upload(req, res, (err) => {
            return next();
        });
    }
}