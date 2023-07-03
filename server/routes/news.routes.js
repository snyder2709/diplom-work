const Router = require("express");
const router = new Router();
const newsController = require('./controllers/news.conroller.js');


router.get('/',newsController.getNews)
module.exports = router