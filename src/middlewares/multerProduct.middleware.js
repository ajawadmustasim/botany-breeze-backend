import multer from "multer";
//import fs from "fs";

// for product
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products")
  },
  filename: function (req, file, cb) {
    const filename = req.product._id;
    cb(null, `${filename}.jpg`);
  }
})

export const uploadProduct = multer({ 
  storage
})
