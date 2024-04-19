const jwt = require('jsonwebtoken')
const JWT_KEY = "EarnFarooqWithViews";

const fetchuser = async (req, res, next) => {
    const Token = req.header('auth-token')
    console.log(Token)
    if (!Token) {
        res.status(401).send({ error: "Please thenticate token" })
    }
    try {
        console.log(1)
        const data = await jwt.verify(Token, JWT_KEY)
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Please authenticate token" })
    }
}

module.exports = fetchuser;