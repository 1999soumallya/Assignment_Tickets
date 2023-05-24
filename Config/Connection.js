const mongoose = require("mongoose")

const ConnectToMongoose = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    let db = mongoose.connection
    db.on("error", (error) => {
        console.log(`MongoDb Connection Error: ${error.toString()}`.red)
        console.log(`Try to reconnect ...`)
        ConnectToMongoose()
    })

    db.on("connected", (error) => {
        console.log(`database is connected successfully`.green)
        console.log(`MongoDb connected on: ${mongoose.connection.host}`.cyan.underline)
    })

    db.on("disconnected", (error) => {
        console.log(`database is disconnected successfully`.green)
    })

}

module.exports = { ConnectToMongoose }