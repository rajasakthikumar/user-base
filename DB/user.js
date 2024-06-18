const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    age: Number,
    email: String,
    phone: String,
    password:{type:String, required: true}
},{ collection: 'user'})

const user = mongoose.model("User", userSchema)

module.exports = user;