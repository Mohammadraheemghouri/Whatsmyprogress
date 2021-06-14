var express = require('express')
const Task = require('./Models/taskmodel.js')
const mongoose = require("mongoose")
const { urlencoded } = require('express')
const mongodb = "mongodb+srv://admin:admin@cluster0.jbhsq.mongodb.net/Project?retryWrites=true "
mongoose.connect(mongodb ,{ useUnifiedTopology: true , useNewUrlParser: true }).then(()=>console.log("database connected")).catch((error)=>console.log(error))


const server =express()
server.set("view engine","ejs")

server.use(urlencoded({extended:true}))

//main page

server.get("/",(req,res)=>{
  res.render("mainpage")
})


//add task page
server.get("/addtask",(req,res)=>{
    res.render("addtask")
})

//post request on add-task (db step)

server.post("/add-task",(req,res)=>{
    console.log(req.body)
    const status="Pending";
    const T1 = new Task(req.body)
    console.log(T1)
    T1.save().then(()=>{
       console.log("added")
    }).catch((err)=>console.log(err))
})

//get tasks page
server.get("/gettasks",(req,res)=>{
    Task.find().then( (data)=>
     res.render("gettasks",{tasks:data} ))
     .catch((err)=>console.log(err));
})
server.use((req,res)=>{
    res.render("errorpage")
})
var hostname ="project";
const port = 1221;
server.listen(port,()=>{
    console.log(`server is up and running at port ${port}`);
})

