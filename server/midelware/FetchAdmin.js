const jwt = require('jsonwebtoken')
const JWT_KEY = "EarnFarooqWithViews";

const fetchadmin = (req,res,next)=>{

    const Token = req.header('AdminODSToken')
    if(!Token)
    {
        res.status(401).send({error:"Please authenticate token"})
    }

    try {
        const data = jwt.verify(Token,JWT_KEY)
        req.admin=data.admin;
        
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate token"})
    }

   

}

module.exports = fetchadmin;