const { makeRoom } = require("../controller/room.controller")

const router = require("express").Router()

router.post("/makeRoom",makeRoom)

module.exports = router