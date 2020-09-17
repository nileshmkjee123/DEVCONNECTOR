const express = require('express');
const router = express.Router();
//@route GET Api/profile
//@desc test route
//@access public
router.get('/',(req,res) => res.send('Profile route'));

module.exports = router;