const jwt = require('jsonwebtoken')
const JWT_SECRET = "vivek$jha";
const fetchuser = (req,res,next) => {
//get a user id from auth-token
   const token = req.header("auth-token");
    if (!token) {
        res.status(401).send("Enter a valid authorize token")
    }
    try {
        let data = jwt.verify(token, JWT_SECRET)
        req.user = data
        next(); 
    } catch (error) {
        res.status(401).send("Enter a valid authorize token")
    }
 
   
}
module.exports = fetchuser; 