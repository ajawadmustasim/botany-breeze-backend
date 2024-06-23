import multer from "multer";
//import fs from "fs";

// for gardener
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/gardener")
  },
  filename: function (req, file, cb) {
    const filename = req.user._id;
    cb(null, `${filename}.jpg`);
  }
})

export const uploadGardener = multer({ 
  storage
})
