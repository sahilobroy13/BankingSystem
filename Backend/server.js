const app = require("./src/app")
const connectToDb = require("./src/config/db.config")
require("dotenv").config();

connectToDb();

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})
