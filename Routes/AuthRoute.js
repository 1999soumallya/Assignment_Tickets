const { Register, Login } = require("../Controller/AuthController")
const { RegisterBodyValidator, LoginBodyValidate } = require("../Validation/AuthRequestValidator")

const Router = require("express").Router()

Router.route("/").post(RegisterBodyValidator, Register)
Router.route("/login").post(LoginBodyValidate, Login)

module.exports = Router