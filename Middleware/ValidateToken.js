const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../Model/UserModel");
const { DecodeToken } = require("../Helper/TokenHelper");

const ValidateToken = expressAsyncHandler(async (req, res, next) => {
    try {

        let token = req.headers.authorization

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]

            await UserModel.findById(await DecodeToken(token).id).select("-password").then((valid) => {
                if (valid && (valid.isActive == true)) {
                    req.user = valid
                    next()
                } else if (valid && (valid.isActive == false)) {
                    res.status(400).json({ message: "User have deactivated", success: false })
                } else {
                    res.status(400).json({ message: "User Not Found", success: false })
                }
            }).catch((error) => {
                res.status(400).json({ message: "User find failed", success: false, error: error })
            })
        } else {
            res.status(400).json({ message: "Please login your account to perform this action", success: false })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something wrong!", success: false, error: error.toString() })
    }
})

module.exports = { ValidateToken }