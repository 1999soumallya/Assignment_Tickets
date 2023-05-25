const expressAsyncHandler = require("express-async-handler");
const { GenerateTickets } = require("../Helper/GenerateTicketHelper");
const uuid = require("uuid")
const TicketModel = require("../Model/TicketModel");
const UserTokenRelationModel = require("../Model/UserTokenRelationModel");
const UserModel = require("../Model/UserModel");
const { Pagination } = require("../Helper/Helper");

const GenerateTicketController = expressAsyncHandler(async (req, res) => {
    try {
        const { user } = req
        let TotalTickets = req.body.totalTokens || 1
        let Tokens = []

        while (TotalTickets > 0) {
            await GenerateTickets().then(async (ticket) => {
                await TicketModel.findOne({ Tickets: ticket }).then(async (found) => {
                    if (!found) {
                        await TicketModel.create({ Tickets: ticket, Uid: uuid.v4() }).then(async (result) => {
                            await UserTokenRelationModel.create({ Ticket: result._id, User: user._id }).then(async (relation) => {
                                relation = await TicketModel.populate(relation, { path: "Ticket" })
                                relation = await UserModel.populate(relation, { path: "User" })
                                Tokens.push(relation)
                            })
                        })
                        TotalTickets--
                    }
                })
            })
        }

        await Promise.all(Tokens).then((result) => {
            res.status(200).json({ message: "All Tickets are saved", success: true, tokens: result })
        }).catch((error) => {
            console.log(error);
            res.status(400).json({ message: "Ticket create failed", success: false, error: error.toString() })
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something is wrong", success: false, error: error.toString() })
    }
})

const GetTokens = expressAsyncHandler(async (req, res) => {
    try {
        const { user } = req

        let count = await UserTokenRelationModel.find({ User: user._id, isActive: true }).count()

        let { limit, offset, totalPage } = Pagination(req.query.page, req.query.limit, count)

        await UserTokenRelationModel.find({ User: user._id, isActive: true }, { Ticket: 1, _id: 0 }).populate("Ticket", "Tickets Uid").skip(offset).limit(limit).then((tickets) => {
            if (tickets.length > 0) {
                res.status(200).json({ message: "Get all user tickets success", success: true, tokens: tickets, pagination: { limit: limit, offset: offset, totalPage: totalPage } })
            } else {
                res.status(200).json({ message: "No tickets Found", success: true })
            }
        }).catch((error) => {
            res.status(400).json({ message: "Tickets Fetch Failed", success: false, error: error.toString() })
        })

    } catch (error) {
        res.status(400).json({ message: "Something is wrong", success: false, error: error.toString() })
    }
})

module.exports = { GenerateTicketController, GetTokens }