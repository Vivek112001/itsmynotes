const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = "vivek$jha"
//route1: Creating endpoint for signup of user
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    // console.log(req.body)
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email already exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry user with this email already exists." })
        }
        let salt = await bcrypt.genSalt(10)
        let secPasswd = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPasswd
        })
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // res.json({ user })
        res.json({ authToken })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})

//Route 2.Creating login endpoint
router.post('/login', [
    body('email', "Enter a valid E-mail").isEmail(),
    body('password', "Enter a correct password").exists(),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Sorry user does not exists" })
        }
        const passwdCompare = await bcrypt.compare(password, user.password)
        if (!passwdCompare) {
            return res.status(400).json({ error: "Wrong Password" })
        }
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }

}
)
//Route 3.Creating a endpoint for getting user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId)
        let user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ error: "Some error occured .please check " })
    }

})
module.exports = router; 