const Router = require("express");
const router = new Router();
const authController = require('./controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware')


router.post('/login',authController.login);
router.post('/logout',authController.logout);
router.post('/entercode',authController.enterSteamGuardCode);
router.post('/authorization',authMiddleware,authController.authorization);

  

module.exports =  router