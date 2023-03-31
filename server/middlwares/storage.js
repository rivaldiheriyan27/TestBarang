const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./assets");
    },
    filename: function (req, file, cb) {
        cb( null, file.originalname );
    },
})


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, next) {
        // hanya menerima file dengan format JPG atau PNG
        const allowedFileTypes = [".jpg", ".jpeg", ".png"];
        const fileType = allowedFileTypes.find((type) =>
            file.originalname.endsWith(type)
        );
        if (!fileType) {
            return next({ name : "Format file yang diizinkan hanya JPG dan PNG"})
        }
        next(null, true);
    },
    limits: {
        fileSize: 100000, // maksimal ukuran file adalah 100KB
    },
});

module.exports = upload;