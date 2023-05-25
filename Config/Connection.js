const mongoose = require("mongoose")

const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
};

const ConnectToMongoose = () => {
    mongoose.connect(process.env.MONGO_URL, options)
    let db = mongoose.connection
    db.on("error", (error) => {
        console.log(`MongoDb Connection Error: ${error.toString()}`.red)
        console.log(`Try to reconnect ...`)
        ConnectToMongoose()
    })

    db.on("connected", () => {
        console.log(`database is connected successfully`.green)
        console.log(`MongoDb connected on: ${mongoose.connection.host}`.cyan.underline)
    })

    db.on("disconnected", () => {
        console.log(`database is disconnected successfully`.green)
    })

}

module.exports = { ConnectToMongoose }