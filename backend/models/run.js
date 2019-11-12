const mongoose = require('mongoose')
const Schema = mongoose.Schema

let OutcomeSchema = new Schema({
    OutcomeTopic: 
    {
        type: String
    },
    Score:
    {
        type: Number
    }
})

let EventSchema = new Schema({
    Event:
    {
        type: String
    },
    Event_Outcome:
    {
        type: [OutcomeSchema]
    }
})

let Run = new Schema({
    Year: {
        type: Number
    },
    Block: {
        type: Number
    },
    Eventlist:{
        type: [EventSchema]
    }
})

module.exports = Run