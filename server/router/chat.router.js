const { add , getMessages } = require("../controller/messages.controller")
const { makeRoom, getAll } = require("../controller/room.controller")

const router = require("express").Router()

router.post("/makeRoom",makeRoom)
router.get("/getAll/:id", getAll)
router.post("/addMessage",add)
router.get("/getMessages/:id",getMessages)

module.exports = router