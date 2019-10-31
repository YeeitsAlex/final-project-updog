const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Run = new Schema({
    Block: {
        type: Number
    },
    Year: {
        type: Number
    },
    Event: {
        type: String
    },
    OutcomeTopic: {
        type: String
    },
    Score: 
    {
        type: Number
    }
})
module.exports = Run