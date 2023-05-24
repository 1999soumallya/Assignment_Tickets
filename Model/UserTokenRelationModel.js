const mongoose = require("mongoose")

var UserRelatedTickets = mongoose.Schema({
    Ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "tickets"
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
// Compile model from schema
module.exports = mongoose.model('usertickets', UserRelatedTickets);