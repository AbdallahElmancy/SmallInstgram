const  router = require('express').Router();
const {addPost} = require('./controller/post.controller');
const {auth} = require("../../middleware/auth");
const endPoints = require('./endPoints');
const multer  = require('multer')

function fileFilter (req, file, cb) {

    if (file.mimetype == "image/jpeg" || file.mimetype ==  "image/png") {
     cb(null, true)
    }else{
     cb(null, false)
    }  
   }
 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
   }
 })
 const upload = multer({ storage: storage,fileFilter }) 

router.post("/addPost",auth(endPoints.post),upload.array('avatar'),addPost)


module.exports = router