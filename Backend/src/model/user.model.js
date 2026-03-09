const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email :{
        type : String,
        trim : true,
        required : [true , "Email is necessary!"],
        unique : [true, "Email is already exists!"],
        lowercase : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Invalid Email type!"]
    },
    name :{
        type : String,
        required : [true , "We need name to create your account!"],
    },
    password :{
        type : String,
        minlength : [6, "Atleast put 6 characters!"],
        required : [true ,"Password required!"],
    }
},{timestamps : true});

userSchema.pre("save", async function(){
    if(!this.isModified(this.password)){
        return;
    }
    hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return ;
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;