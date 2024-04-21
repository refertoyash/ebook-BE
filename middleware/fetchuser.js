var jwt = require('jsonwebtoken');
const JWT_SECRET = "Aryanisagoodb$oy";


const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object

    const token = req.header('auth-token');

    if (!token) {
        // console.log("hello");
        res.status(401).send({ error: "Please authenticate using a valid token" });
    } 

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        // console.log("hello2");
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

}

module.exports = fetchuser;