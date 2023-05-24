const express = require("express")
const { ConnectToMongoose } = require("./Config/Connection")
const { ValidateToken } = require("./Middleware/ValidateToken")
require("colors")
require("dotenv").config()

const app = express()
ConnectToMongoose()

app.use(express.json())

app.get('/', (req, res) => res.send('Hello My Api Server Is Running'))

// Routers List
app.use("/api/auth", require("./Routes/AuthRoute"))
app.use("/api/ticket", ValidateToken, require("./Routes/TicketRoute"))

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`.yellow))