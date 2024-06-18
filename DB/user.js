const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: String
},{ collection: 'user'})

const user = mongoose.model("User", userSchema)

module.exports = user;