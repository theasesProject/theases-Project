const { add , getMessages } = require("../controller/messages.controller")
const { makeRoom, getAll , getAllUser2} = require("../controller/room.controller")

const router = require("express").Router()

router.post("/makeRoom",makeRoom)
router.get("/getAllRoomsUserId/:id", getAll)
router.get("/getAllRoomsUser2/:id", getAllUser2)
router.post("/addMessage",add)
router.get("/getMessages/:id",getMessages)

module.exports = router