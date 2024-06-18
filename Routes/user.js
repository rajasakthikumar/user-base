const express = require('express');
const User = require('../DB/user');
const router = express.Router();
router.use(express.json());


router.use(
    (req,res,next)=>{
    console.log('User Router Middleware is being accessed')
    next()
}
)

router.get('/',async (req,res)=>{
    let user = await User.find()
    res.json(user)
})

router.post('/',async (req,res)=> {
    let name = req.body.name
    let age = Number(req.body.age)
    await User.create({
        name: name,
        age: age
    }).then(console.log('User added successfully'))
    res.status(200).json(
        {message:"User added successfully"}
    )
});

module.exports = router;

