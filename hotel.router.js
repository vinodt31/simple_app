const router = require("express").Router();
const hotelController = require("./hotel.controller") 

router.get("/",hotelController.findAll)

router.post("/",hotelController.create)

module.exports = router;