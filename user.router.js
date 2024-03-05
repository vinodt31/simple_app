const router = require("express").Router();
const hotelController = require("./user.controller") 

router.get("/",userController.findAll)

router.post("/",userController.create)
router.delete("/:id",userController.delete)

module.exports = router;