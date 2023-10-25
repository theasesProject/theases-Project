const {Sequelize,Datatype}=require("sequelize")

const connection=new Sequelize("rent","root","root",{
    host:"localhost",
    dialect:"mysql"
})
connection.authenticate().then(()=>{
    console.log("connected successfully")
}).catch(err=>{
    console.error("error connecting to database", err)
})


const db={}
db.connection=connection
db.Sequelize=Sequelize
db.Admin=require("./admin.model")
db.User=require("./user.model")

module.exports.db=db