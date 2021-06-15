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


//to check if request is empty
function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
  
    return true;
  }


server.post("/add-task",(req,res)=>{
    console.log(req.body)
    const status="Pending";
    const T1 = new Task(req.body)
    console.log(T1)

    //checking for a blank response or an error response
    if(
        T1.taskname.length<=1 && T1.description.length<=1 && T1.priority==null &&T1.status.length<=1
    ){
        res.statusCode = 200
        res.send("<center><h3>blank request / check if all fields are entered </h3></center")
    }else{
    T1.save().then(()=>{
       console.log("added")
       res.redirect("/")
    }).catch((err)=>console.log(err))}
   
})

//get tasks page
server.get("/gettasks",(req,res)=>{
    Task.find().then( (data)=>
     res.render("gettasks",{tasks:data} ))
     .catch((err)=>console.log(err));
})


//task completed page
server.get("/completedtask",(req,res)=>{
    Task.find({status:"completed"}).then((data)=>{
        res.render("gettasks",{tasks:data})
    }).catch((err)=>console.log("somethings error"))
})


//prioritypage
server.get("/priority",(req,res)=>{
    Task.find({priority:1}).then((data)=>{
        res.render("gettasks",{tasks:data})
    }).catch((err)=>console.log("somethings error"))
})
server.use((req,res)=>{
    res.render("errorpage")
})
var hostname ="project";
const port = 1221;
server.listen(port,()=>{
    console.log(`server is up and running at port ${port}`);
})

