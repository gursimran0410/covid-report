const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const {MONGOURI} = require('./keys')
const cors = require('cors')

app.use(cors())

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(
    MONGOURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }
).then(()=>{console.log("Connection to MongoDb Successful")})
.catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>{
    console.log("Server is running on PORT:",PORT)
})