const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
const router = express.Router()

app.use(cors())
app.use(bodyParser.json())

app.listen(4000, () => console.log("server running on port 4000"))

var pool  = mysql.createPool({
    connectionLimit : 20,
    host            : 'localhost',
    user            : 'root',
    password        : 'rocksarehard',
    database        : 'mysql'
  });
// to use connection: pool.getConnection() -> connection.query() -> connection.release() 

app.post('/user_create', (req, res) =>
{
    const email = req.body.email
    const password = req.body.password
    const q = "INSERT INTO Persons (email, password) VALUES (?, ?);"
    pool.getConnection(function(err, connection)
    {
        if (err)
        {
            console.log("could not get connection")
        }
        connection.query(q, [email, password], (error, rows, fields) =>
        {
            connection.release()
            if (err)
            {
                console.log("qeury failed " + err)
                res.sendStatus(500)
                return
            }
        })
        res.end()
    })
})
app.get('/list/list_all_users', (req, res) =>
{
    const q = "SELECT * FROM Persons"
    pool.getConnection(function(err, connection)
    {
        if (err) 
        {
            console.log("could not connect" + err)
        }
        connection.query(q, (err, result, fields) =>
        {
            connection.release()
            //console.log(result)
            if (err)
            {
                console.log("could not search " + err)
                return
            }
            res.json(result)
        })
    })
})
