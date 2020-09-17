const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
const User  = require('../../models/User') ;
const e = require('express');
//@route POST Api/users
//@desc register User
//@access public
router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],
async (req,res) => {
const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
          return  res.status(400).json({errors:[{msg:'User already exists'}]});
        }
        //see if user  exists 
        const avatar = gravatar.url(email,{
            s:'200',//size
            r:'pg',//rating
            d:'mm'//default image
        })
        user = new User({
            name,email,avatar,password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
    //GET users gravatar

    //Encrypt password
    //return json web token
    res.send('User registered');

    }
     catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
        
     }
    
});

module.exports = router;