import multer from "multer";

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
    storage,
})