const { GenerateTicketController, GetTokens } = require("../Controller/TicketController")

const Router = require("express").Router()

Router.route("/").post(GenerateTicketController).get(GetTokens)

module.exports = Router