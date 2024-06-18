const mongoose = require('mongoose')

// ToDo Schema

const todoSchema = new mongoose.Schema({
    toDo: String,
    description: String,
    completed:{type: Boolean, default: false},
    priority: {type: String, enum: ['low','medium','high'], default: 'medium'}
}, {collection: 'todo'})

const ToDo = mongoose.model("ToDo",todoSchema)

module.exports = ToDo;