const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
var Run = require('./models/run')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const connection = mongoose.connection
app.listen(4000, () => console.log("server running on port 4000"))

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
const uri = "mongodb+srv://nguyenalice66:rocksarehard6@cluster0-sl1km.mongodb.net/cs179?retryWrites=true&w=majority"
mongoose.connect(uri, options)

const R1 = mongoose.model('run1', Run)

app.post("/addCelltoRun1", (req, res) =>
{
    var r = new R1(req.body)
    r.save()
    .then(run => {
        res.status(200).json({'run':'added successfully'})
    })
    .catch(err => {
        res.status(400).send("failed to create new cell")
    })
})
app.get("/listFromRun1", (req, res) =>
{
    console.log("inside post")
    R1.find((err, run)=>{
        console.log("hi from backend")
        if(err)
        {
            console.log("could not proccess " + err)
        }
        else
        {
            res.json(run)
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
// R1.find((err, run)=>{
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
