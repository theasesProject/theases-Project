const express=require('express')

const carRouter=require("./router/carRouter")
require("./models")
const cors=require('cors')
const app=express()
const port=5000
 app.use(cors())

 app.use(express.json())

app.use("/api/car",carRouter)


 app.listen(5000, function(){
    console.log("Server is running on port 5000",port)})
 