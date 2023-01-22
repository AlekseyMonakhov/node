const { Router } = require("express");

const router = Router();

const authController = require('../controllers/auth');

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);


module.exports = router;