const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
var Run = require('./models/run') //Schema (format) for run collection
// var EventSchema = require('./models/run')
// var OutcomeSchema = require('./models/run') 
var util = require('util')
var test = "run0"
const fs = require('fs')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const connection = mongoose.connection
app.listen(4000, () => console.log("server running on port 4000")) //create server on localHost:4000

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    // reconnectInterval: 500, // Reconnect every 500ms
    // poolSize: 10, // Maintain up to 10 socket connections
    // // If not connected, return errors immediately rather than waiting for reconnect
    // bufferMaxEntries: 0,
    // connectTimeoutMS: 360000, // Give up initial connection after 360 seconds
    // socketTimeoutMS: 360000, // Close sockets after 360 seconds of inactivity
    // family: 4 // Use IPv4, skip trying IPv6
  };
const uri = "mongodb+srv://sfeng023:Fsy123456789@cluster0-sl1km.mongodb.net/cs179_run_test?retryWrites=true&w=majority"
mongoose.connect(uri, options) //connect to mongodb cs179 with my crudentials and options above

const R1 = mongoose.model(test, Run, test) // make a model for run1 with mongoose model to easily access database

//writing route will finish later
// app.post("/addCelltoRun1", (req, res) =>
// {
//     //http get can be sent to localhost:4000/addCelltoRun1
//     var r = new R1(req.body) //declare new run model and get instance from request.body
//     r.save() //mongoose function for collection.insert
//     .then(run => {
//         res.status(200).json({'run':'added successfully'}) //return status 200 if insert went thru
//     })
//     .catch(err => {
//         res.status(400).send("failed to create new cell") //return status 400 if insert failed
//     })
// })
app.get("/listFromRun", (req, res) =>
{
    //http post can be retrieved from localhost:4000/listFromRun1
    R1.find({}).select("Year Block Eventlist.Event Eventlist.Event_Outcome.OutcomeTopic Eventlist.Event_Outcome.Score")
    .lean().exec(function(err, run) {
        if(err)
        {
            console.log("could not proccess " + err)
        }
        else
        {
            res.json(run) //return json of the result to perosn who requested it
        }
      })
})
app.get("/listScores", (req, res) =>
{
    //http post can be retrieved from localhost:4000/listFromRun1
    R1.find({}, "Eventlist.Event_Outcome.Score")
    .lean().exec(function(err, run) {
        if(err)
        {
            console.log("could not proccess " + err)
        }
        else
        {
            res.json(run) //return json of the result to perosn who requested it
        }
      })
})
app.get("/listOutcomes", (req, res) =>
{
    //http post can be retrieved from localhost:4000/listFromRun1
    R1.findOne({"Year": 0}, {"Eventlist": {$slice: 1}})
    .select("Eventlist.Event_Outcome.OutcomeTopic").lean().exec(function(err, run) {
        if(err)
        {
            console.log("could not proccess " + err)
        }
        else
        {
            res.json(run) //return json of the result to perosn who requested it
        }
    })
})
app.get("/listEvents", (req, res) =>
{
    //http post can be retrieved from localhost:4000/listFromRun1
    R1.find().select("Eventlist.Event")
    .lean().exec(function(err, run) {
        if(err)
        {
            console.log("could not proccess " + err)
        }
        else
        {
            res.json(run) //return json of the result to perosn who requested it
        }
    })
})
//code to add cell to run1 collection
// prRun = new R1({Block:1, Year:2, Event: "askd", OutcomeTopic: "hahah", Score: .4}) 
// prRun.save()
//     .then(run=>{
//         console.log("added")
// })
//     .catch(err=>{
//         console.log("couldn't add")
//     })

//Code to print all runs in console
// R1.find({}, (err, run)=>{
//     console.log("hi from backend")
//     if(err)
//     {
//         console.log("could not proccess " + err)
//     }
//     else
//     {
//         console.log(run)
//     }
// })

// R1.find().select("Eventlist.Event")
// .lean().exec(function(err, run) {
//     if(err)
//     {
//         console.log("could not proccess " + err)
//     }
//     else
//     {
//         fs.writeFile('shiyao.txt', util.inspect(run, false, null), (err)=>
//         {
//             if (err) throw err;
//             console.log("saved for shiyao")
//         })
//         //console.log(util.inspect(run, false, null))
//     }
//     })