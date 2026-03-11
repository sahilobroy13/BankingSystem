const express = require("express")
const cookieParser = require("cookie-parser")
const authRoute = require("../src/routes/auth.routes")
const accountRoute = require("../src/routes/account.routes")
const app = express()
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRoute)
app.use("/api/account", accountRoute)
module.exports = app