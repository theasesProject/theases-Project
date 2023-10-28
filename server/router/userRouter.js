const {SignUpUser,bringUsersData}=require('../controller/Client')
const express = require('express')
const router = express.Router()

router.get('/BringUserData',bringUsersData)
router.post('/SignUpUser',SignUpUser)


module.exports=router



