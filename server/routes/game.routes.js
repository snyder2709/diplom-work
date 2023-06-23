const Router = require("express");
const router = new Router();
const gameController = require('./controllers/game.controller')


router.get('/top-games',gameController.getTopGames)
router.post('/app',gameController.getAppId)
router.get('/featured-categories',gameController.getFeaturedCategories)
router.get('/search',gameController.getSearchAppList)
module.exports =  router