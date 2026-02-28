const mongoose = require("mongoose");

async function ConnectToDb(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connected Successfully! ");
    })
    .catch(err =>{
        console.log("Database connection Failed! ")
        process.exit(1);
    })
}

module.exports = ConnectToDb;