const mongoose = require('mongoose')

// ToDo Schema

const todoSchema = new mongoose.Schema({
    toDo: String,
    description: String
}, {collection: 'todo'})

const ToDo = mongoose.model("ToDo",todoSchema)

module.exports = ToDo;