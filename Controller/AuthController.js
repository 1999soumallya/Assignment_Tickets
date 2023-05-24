const expressAsyncHandler = require("express-async-handler");
const { Token } = require("../Helper/TokenHelper");
const UserModel = require("../Model/UserModel")

const Register = expressAsyncHandler(async (req, res) => {
    try {

        const { name, email, password, picture } = req.body

        await UserModel.findOne({ email: email }).then(async (result) => {

            if (result) {
                res.status(400).json({ message: "User already exsist's", success: false, error: result })
            } else {
                await UserModel.create({ name: name, email: email, password: password, picture: picture, isActive: true, isAdmin: true }).then(async (create) => {
                    res.status(200).json({ message: "User create successfull", success: true, result: create, token: await Token(create._id) })
                }).catch((err) => {
                    res.status(400).json({ message: "User create failed", success: false, error: err })
                });
            }

        }).catch((err) => {
            res.status(400).json({ message: "User find failed", success: false, error: err })
        });

    } catch (error) {
        res.status(400).json({ message: "Something is wronge!", success: false, error: error.toString() })
    }
})

const Login = expressAsyncHandler(async (req, res) => {
    try {

        const { email, password } = req.body

        await UserModel.findOne({ email: email }).then(async (result) => {
            if (result && (await result.matchPassword(password))) {
                res.status(200).json({ message: "User login successfull", success: true, result: result, token: await Token(result._id) })
            } else {
                res.status(400).json({ message: "Email or Password is not valid", success: false })
            }
        }).catch((err) => {
            console.log(err)
            res.status(400).json({ message: "User login failed", success: false, error: err.toString() })
        });

    } catch (error) {
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

module.exports = { Register, Login }