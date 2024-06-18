const express = require('express');
const User = require('../DB/user');
const router = express.Router();
const zod = require('zod')
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
    let email = req.body.email
    let phone = req.body.phone
    await User.create({
        name: name,
        age: age,
        email: email,
        phone: phone
    }).then(console.log('User added successfully'))
    res.status(200).json(
        {message:"User added successfully"}
    )
});

module.exports = router;

