const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
async function authenticateUser (req,res ,next){
    const token = req.cookies.token || req.headers.authorization?.spli(" ")[1];
    if(!token){
        return res.status(401).json({message : "Unauthorized Access, Missing Token!"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne(decoded.userId);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = authenticateUser;