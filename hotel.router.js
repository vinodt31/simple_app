const router = require("express").Router();
const hotelController = require("./hotel.controller") 

router.get("/",hotelController.findAll)

router.post("/",hotelController.create)
router.delete("/:id",hotelController.delete)

//router.get("/user-list",hotelController.userList)

module.exports = router;