const express =require("express")
const mogodb=require("mongoose")
const cors=require("cors")

//creating app object using express
const app=express()

//integrate cors and json format
app.use(cors())
app.use(express.json())

//connect with DB and get the connection object
mogodb.connect("mongodb://localhost:27017/employees")
.then(()=>console.log("Mongodb connection successful"))
.catch(err=>console.log("Mongodb connection failed",err))

//start the server
const PORT=3000
app.listen(PORT,()=>console.log(`Server started on:${PORT}`))