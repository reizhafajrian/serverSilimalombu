const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const checkcfile = (file, cb) => {
  const types = /jpg|jpeg|png|/;
  const extname = types.test(path.extname(file.originalname).toLowerCase());
  const mimetype = types.test(file.mimetype);
  mimetype && extname ? cb(null, true) : cb("error: images only");
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkcfile(file, cb);
  },
}).single("image");
module.exports={
    upload
}
