const  router = require('express').Router();
const {signUp,confirmPassword} = require("./controller/user.controller")
const userValidation = require('./userValidtion')

router.post("/user/signup", userValidation ,signUp)
router.get("/user/confirmEmail/:token",confirmPassword)


module.exports = router