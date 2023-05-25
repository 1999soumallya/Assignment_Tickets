const mongoose = require("mongoose")

var GeneratedTickets = mongoose.Schema({
    Tickets: {
        type: Object,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    Uid: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
// Compile model from schema
module.exports = mongoose.model('tickets', GeneratedTickets);