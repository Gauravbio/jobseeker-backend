const { createUser, loginUser } = require("./controller");

const router=require("express").Router();

router.route("/create").post(createUser);

router.route("/login").post(loginUser);

module.exports=router;