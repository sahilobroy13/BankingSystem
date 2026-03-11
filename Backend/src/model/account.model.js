const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "Account must be associated with the user."],
        index : true,
    },
    status :{
        type : String,
        enum :{
            values : [ "ACTIVE" , "FROZEN" , "CLOSED" ],
            message : "Status can be either active ,fozen or closed."
        },
        default :"ACTIVE",
    },
    currency :{
        type : String,
        required : [true,"Currency is required!"],
        default : "INR"
    }
},{timestamps : true});

accountSchema.index({user : 1 , status : 1});

const accoundModel = mongoose.model("account", accountSchema);
module.exports = accoundModel;