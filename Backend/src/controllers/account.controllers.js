const accountModel = require("../model/account.model");

async function createAccountController (req,res){
    const user = req.user;
    try {
        const account = await accountModel.create({
            user : user._id,
        })
        res.status(200).json({message : "Account Created Successfully!" ,account});
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { createAccountController };