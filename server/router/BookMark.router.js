const express = require('express')
const { add, getAll, remove } = require('../controller/BookMarks.controller')
const router = express.Router()

router.post("/add",add)
router.get("/getAll",getAll)
router.delete("/delete/:CarId",remove)

module.exports = router