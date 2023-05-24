const expressAsyncHandler = require("express-async-handler");
const Joi = require("joi");

const RegisterBodyValidator = expressAsyncHandler(async (req, res, next) => {
    try {

        let schima = Joi.object({
            email: Joi.string().required().email().message("Plase provide a valid email"),
            password: Joi.string().required().min(6).message("Password length should be gatter than 6"),
            confirmpassword: Joi.ref("password"),
            name: Joi.string().required()
        }).and("email", "password", "confirmpassword", "name")

        if (schima.validate(req.body).error) {
            res.status(400).json({ message: "Please fill all the details", success: false, error: schima.validate(req.body).error.message })
        } else {
            next()
        }

    } catch (error) {
        res.status(400).json({ message: "Something is wrong!", success: false, error: error.toString() })
    }
})

const LoginBodyValidate = async (req, res, next) => {
    try {

        let schima = Joi.object({
            email: Joi.string().required().email().message("Plase provide a valid email"),
            password: Joi.string().required(),
        }).and("email", "password")

        if (schima.validate(req.body).error) {
            res.status(400).json({ message: "Please fill all the details", success: false, error: schima.validate(req.body).error.message })
        } else {
            next()
        }

    } catch (error) {
        res.status(400).json({ message: "Something wrong!", success: false, error: error.toString() })
    }
}

module.exports = { RegisterBodyValidator, LoginBodyValidate }