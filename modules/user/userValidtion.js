const { body , validationResult} = require('express-validator')


const userValidation = [
    body("userName").isString().optional({checkFalsy: true}),
    body("email").isEmail().withMessage("email is  wrong"),
    body("firstName").isString().optional({checkFalsy: true}),
    body("password").matches(/^[a-zA-Z0-9]{5,30}$/).withMessage("password should strong"),
    body("gender").isString().optional({checkFalsy: true}),
    body("confirmed").isBoolean().optional({checkFalsy: true}),
    body("role").isString().optional({checkFalsy: true}),
    body("profilePic").isString().optional({checkFalsy: true}),
    body("converPics").isArray().optional({checkFalsy: true}),
    body("flowers").isArray().optional({checkFalsy: true}),
    body('confirmedPassword')
    .exists({checkFalsy: true}).withMessage('You must type a confirmation password')
    .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
    (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  }, 
   

]
module.exports = userValidation