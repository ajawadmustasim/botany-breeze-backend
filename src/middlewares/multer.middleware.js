import multer from "multer";
//import fs from "fs";

// for User's DP
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/user")
    },
    filename: function (req, file, cb) {
      const dp = req.user.username;
      cb(null, `${dp}.jpg`);
    }
  })
  
export const upload = multer({ 
    storage
})