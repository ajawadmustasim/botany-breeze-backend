import multer from "multer";
//import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/user")
    },
    filename: function (req, file, cb) {
      const username = req.user.username;
      cb(null, `${username}.jpg`);
    }
  })
  
export const upload = multer({ 
    storage
})

