const JsonWebToken = require("jsonwebtoken")

const Token = (id) => {
    return JsonWebToken.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "15d" })
}

const DecodeToken = (token) => {
    return JsonWebToken.verify(token, process.env.TOKEN_SECRET)
}

module.exports = { Token, DecodeToken }