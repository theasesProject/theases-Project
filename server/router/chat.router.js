const { makeRoom, getAll } = require("../controller/room.controller")

const router = require("express").Router()

router.post("/makeRoom",makeRoom)
router.get("/getAll/:id", getAll)

module.exports = router