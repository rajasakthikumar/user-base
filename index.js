const express = require('express');
const mongoose = require('mongoose');
const User = require('./DB/user');
const cors = require('cors');
const userRouter = require('./Routes/user')
const todoRouter = require('./Routes/todo')

const app = express()
// middleware
app.use(express.json());
app.use(cors());

app.use((req,res,next)=> {
    console.log('App Level Middleware');
    console.log('Flow First comes here')
    console.log('Logging URLs', req.url)
    next();
})

app.use("/user", userRouter)
app.use("/todo", todoRouter)

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


async function run() {
    await mongoose.connect("mongodb://localhost:27017/todo").then(console.log("connected"));
}

function enterSampleData() {
   User.create({
        name: "Raja",
        age:28
    }).then(console.log('User is created'))
}

run();
// enterSampleData();