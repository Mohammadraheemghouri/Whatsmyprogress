var mongoose = require("mongoose")

const Schema = mongoose.Schema

var taskmodel = new Schema({
    taskname:String,
    priority:Number,
    description:String,
    status:String
},{timestamps:true}
)

var Task = mongoose.model("tasks",taskmodel)


module.exports = Task

