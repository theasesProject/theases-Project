const sequalize = require('sequelize')
const { db } = require("../models/index")
module.exports = {
    bringUsersData: async (req, res) => {
        try {
            const Users = await db.User.findAll({
            })
            res.json(Users)
        } catch (error) {
            throw error
        }
    },
    SignUpUser:async(req,res,next)=>{
        const NameCheck= await db.User.findAll({
            where:{
                userName:req.body.userName
            }
        })
        const emailCheck= await db.User.findAll({
            where:{
                email:req.body.email
            }
        })
        if (NameCheck[0]||emailCheck[0]) {
            if (NameCheck[0]) {
                return res.status(403).send({
                    status: "Blocked",
                    message: "This UserName Already Exists",
                    found:NameCheck
                  })
            }
            if (emailCheck[0]) {
               return  res.status(403).send({
                    status: "Blocked",
                    message: "This Email Already Exists",
                    found:emailCheck
                  })
            }
        }else{
            const User = await db.User.create(req.body);
            res.status(201).send({
              status: "success",
              message: "user added successfully!!!",
              data: User,
            });
        }
        try {
        } catch (err) {
            next(err)
        }
    }
}