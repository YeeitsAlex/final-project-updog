const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
var Run = require('./models/run') //Schema (format) for run collection
var Runs = require('./models/runs')
// var EventSchema = require('./models/run')
// var OutcomeSchema = require('./models/run') 
var util = require('util')
const fs = require('fs')
const app = express()

app.use(cors())
app.use(bodyParser.json())

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

// var test = "run0"
// const R1 = mongoose.model(test, Run, test) // make a model for run1 with mongoose model to easily access database
const runNames = mongoose.model("runs", Runs)

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

app.get("/listFromRun/:r", (req, res) =>
{
    var runName = req.params.r
    const R2 = mongoose.model(runName, Run, runName)
    //http post can be retrieved from localhost:4000/listFromRun1
    R2.find({}).select("Year Block Eventlist.Event Eventlist.Event_Outcome.OutcomeTopic Eventlist.Event_Outcome.Score")
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
app.get("/listScoresAndEventName/:r", (req, res) =>
{
    var runName = req.params.r
    const R2 = mongoose.model(runName, Run, runName)
    //http post can be retrieved from localhost:4000/listFromRun1
    R2.find({}).select("Eventlist.Event Eventlist.Event_Outcome.Score")
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
app.get("/listOutcomes/:r", (req, res) =>
{
    var runName = req.params.r
    const R2 = mongoose.model(runName, Run, runName)
    //http post can be retrieved from localhost:4000/listFromRun1
    R2.findOne({Year: 0}, {"Eventlist": {$slice: 1}})
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
app.get("/listEvents/:r", (req, res) =>
{
    var runName = req.params.r
    const R2 = mongoose.model(runName, Run, runName)
    //http post can be retrieved from localhost:4000/listFromRun1
    R2.find().select("Eventlist.Event")
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
app.get("/listEventswithSpecifics/:r/:y/:b", (req, res) => { //not working
    b = req.params.b
    y = req.params.y
    var runName = req.params.r
    const R2 = mongoose.model(runName, Run, runName)
    R2.findOne({Block: b, Year: y}).select("Eventlist.Event")
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
app.get("/listRunWithSpecifics/:r/:y/:b", (req, res) => { //not working
    b = req.params.b
    y = req.params.y
    var runName = req.params.r
    const R2 = mongoose.model(runName, Run, runName)
    R2.findOne({Block: b, Year: y})
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
app.get("/listCollections", (req, res) => {
    runNames.find().select("runName").lean().exec(function(err, run) {
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
app.get("/listScorewithEventAndOutcome/:r/:e/:o", (req, res) => {
    eName = req.params.e
    oName = req.params.o
    var runName = req.params.r
    const R2 = mongoose.model(runName, Run, runName)
    R2.findOne({
        'Eventlist.Event': eName
        // ,
        // 'Eventlist.Event_Outcome.OutcomeTopic': "GP Biochemistry and molecular biology"
        // {
        //     // "$elemMatch": 
        //     // {"OutcomeTopic": "GP Biochemistry and molecular biology"}
        //     "OutcomeTopic": "GP Biochemistry and molecular biology"
        // }
    }, 
    {"Eventlist.Event.$": 1}, 
    // {"Eventlist": {$slice: 1}}
    //{"Eventlist.Event_Outcome": {$slice: 1}} 
    // SLICE FURTHER LATER BECAUSE NOT WORKING RIGHT NOW!!! 
    // CHEAT METHOD IS SEARCHING THROUGH RETURN VALUE AND RETURNING THAT INSTEAD
    )
    //.select("Block Year Eventlist.Event_Outcome.OutcomeTopic Eventlist.Event Eventlist.Event_Outcome.Score")
    .lean().exec(function(err, run) {
        if(err)
        {
            console.log("could not proccess " + err)
        }
        else
        {
            // fs.writeFile('shiyao.txt', util.inspect(run, false, null), (err)=>
            // {
            //     if (err) throw err;
            //     console.log("saved for shiyao")
            // })
            pValue = run.Eventlist[0].Event_Outcome
            notfound = true
            size = pValue.length
            i = 0
            while(notfound && i < size)
            {
                if(pValue[i].OutcomeTopic == oName)
                {
                    holder = pValue[i]
                    notfound = false
                }
                i++
            }
            res.json(holder)
            //res.send(holder[])
        }
    })
})

// R1.findOne({
//     'Eventlist.Event': '401001 Overview_Pituitary'
//     // ,
//     // 'Eventlist.Event_Outcome.OutcomeTopic': "GP Biochemistry and molecular biology"
//     // {
//     //     // "$elemMatch": 
//     //     // {"OutcomeTopic": "GP Biochemistry and molecular biology"}
//     //     "OutcomeTopic": "GP Biochemistry and molecular biology"
//     // }
// }, 
// {"Eventlist.Event.$": 1}, 
// // {"Eventlist": {$slice: 1}}
// //{"Eventlist.Event_Outcome": {$slice: 1}} 
// // SLICE FURTHER LATER BECAUSE NOT WORKING RIGHT NOW!!! 
// // CHEAT METHOD IS SEARCHING THROUGH RETURN VALUE AND RETURNING THAT INSTEAD
// )
// //.select("Block Year Eventlist.Event_Outcome.OutcomeTopic Eventlist.Event Eventlist.Event_Outcome.Score")
// .lean().exec(function(err, run) {
//     if(err)
//     {
//         console.log("could not proccess " + err)
//     }
//     else
//     {
//         // fs.writeFile('shiyao.txt', util.inspect(run, false, null), (err)=>
//         // {
//         //     if (err) throw err;
//         //     console.log("saved for shiyao")
//         // })
//         pValue = run.Eventlist[0].Event_Outcome
//         notfound = true
//         size = pValue.length
//         i = 0
//         while(notfound && i < size)
//         {
//             if(pValue[i].OutcomeTopic == "GP Biochemistry and molecular biology")
//             {
//                 holder = pValue[i]
//                 notfound = false
//             }
//             i++
//         }
//         console.log(holder)
//     }
// })

// R1.findOne({Year: 0, Block: 4})
//     .select("Year Block Eventlist.Event Eventlist.Event_Outcome.OutcomeTopic Eventlist.Event_Outcome.Score")
//     .lean().exec(function(err, run) {
//     if(err)
//     {
//         console.log("could not proccess " + err)
//     }
//     else
//     {
//         // fs.writeFile('shiyao.txt', util.inspect(run, false, null), (err)=>
//         // {
//         //     if (err) throw err;
//         //     console.log("saved for shiyao")
//         // })
//         console.log(util.inspect(run, false, null))
//     }
//     })
// mongoose.connection.on('connected', function (ref) {
//     console.log('Connected to mongo server.');
//     //trying to get collection names
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         console.log(names); // [{ name: 'dbname.myCollection' }]
//     });
// })

