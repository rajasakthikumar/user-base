const express = require('express');
const mongoose = require('mongoose');
const User = require('./DB/user');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {z} = require('zod');
const session = require("express-session");


const userRouter = require('./Routes/user')
const todoRouter = require('./Routes/todo')

const secretKey = "Coding" //should be moved to different file later
const validation = require('./validate')
const {registerSchema,loginSchema} = require('./validationSchema');

const jwtSecret = "secret"


const app = express()
// middleware
app.use(express.json());
app.use(cors());
app.use(validation)

app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } 
}));

// just for testing purpose
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

app.post('/login', async (req,res) => {
  try 
  {
    loginSchema.parse(req.body);
    const {username,password} = req.body;
    const userAccount = await User.findOne({username:username})
  
    bcrypt.compare(password,userAccount.password, (err,result) => {
        if(result) {
          req.session.user = {user: username}
          res.status(200).json({message: "User Found.Logged in Successfully"});
        } else {
          res.status(400).json({message:"Password error"})
        }
    })

  } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({error: error.message})
      }
  }
})

app.get('/logout', (req,res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(400).json({message:"Failed to logout"})
    }
  })
});


app.post('/register', async (req, res) => {
  try {
    registerSchema.parse(req.body)
    const { username,age,email,phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, age, email, phone, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, jwtSecret);

    res.status(201).json({ Authorization: token });
  } catch (error) {
    if (error instanceof z.ZodError) {
        return res.status(400).json({error: error.errors[0].message})
    }
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