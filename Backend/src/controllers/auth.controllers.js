const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailService = require("../services/email.service")

async function registerController(req,res) {
  try {
    const { name, email, password } = req.body;
    const isExists = await userModel.findOne({email : email});
    if (isExists) {
      return res
        .status(201)
        .json({
          message: "User ALready existed with register email or username!",
        });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name: name,
      email: email,
      password: hashed,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({ message: "User registered successfully!", token });
    await emailService.sendRegistrationEmail(user.email , user.name);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function loginController(req,res){
    try {
        const {email , password} = req.body;
        const user = await userModel.findOne({ email : email});
        if(!user){
            return res.status(402).json({message : "User Not Exist!"});
        }
        const validPassword = await user.comparePassword(password);
        if(!validPassword){
            return res.status(402).json({message: "Invalid Password!"});
        }
        const token = await jwt.sign({userid : user._id}, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(400).json({message : "User login Successfully!",user});

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { registerController , loginController };
