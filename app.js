const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const {userRoute,postRoute} = require("./routes/allRoute.routes")
const connection = require("./DB/connectDB")
connection()

app.use(express.json())

app.use(userRoute)
app.use(postRoute)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))