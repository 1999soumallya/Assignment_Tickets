const mongoose = require("mongoose");
const bcryptJs = require("bcryptjs")

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dv2rk4htu/image/upload/v1681739813/87-1024_i220jr.png"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

UserSchema.pre("save", async function (req, res, next) {
    if (!this.isModified("password")) {
        next()
    }
    let salt = await bcryptJs.genSalt(10)
    this.password = await bcryptJs.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enterpassword) {
    return await bcryptJs.compare(enterpassword, this.password)
}

// Compile model from schema

module.exports = mongoose.model('user', UserSchema)