const { Router } = require("express");

const router = Router();

const authController = require('../controllers/auth');

router.get("/login", authController.getLogin);

module.exports = router;