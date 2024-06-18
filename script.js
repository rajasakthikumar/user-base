const mongo= require("mongoose");

new Promise(mongo.connect("mongodb://localhost:27017/todo")).then(console.log("connected"))
