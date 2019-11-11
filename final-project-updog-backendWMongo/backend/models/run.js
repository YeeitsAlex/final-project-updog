// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// let Run = new Schema({
//     Block: {
//         type: Number
//     },
//     Year: {
//         type: Number
//     },
//     Event: {
//         type: String
//     },
//     OutcomeTopic: {
//         type: String
//     },
//     Score: 
//     {
//         type: Number
//     }
// })
// module.exports = Run
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
    EventOutcome:
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