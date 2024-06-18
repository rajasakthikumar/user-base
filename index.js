const express = require('express');
const mongoose = require('mongoose');
const User = require('./DB/user');
const cors = require('cors');
const userRouter = require('./Routes/user')
const todoRouter = require('./Routes/todo')
const jwt = require('jsonwebtoken')
const secretKey = "Coding" //should be moved to different file later
const validation = require('./validate')

const app = express()
// middleware
app.use(express.json());
app.use(cors());
app.use(validation)


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



app.post('/register', async (req, res) => {
  try {
    const { username,age,email,phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username,age,email,phone, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, jwtSecret);

    res.status(201).json({ Authorization: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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