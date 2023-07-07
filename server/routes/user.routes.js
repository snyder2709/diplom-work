const Router = require("express");
const router = new Router();
const userController = require('./controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware')


router.post('/logOn',userController.logOn);
router.post('/logout',userController.logout);
router.post('/entercode',userController.enterSteamGuardCode);
router.post('/authorization',authMiddleware,userController.authorization);
router.post('/ownedapp',authMiddleware,userController.getOwnedApps);
router.get('/byapp',authMiddleware,userController.requestFreeLicense);
module.exports =  router