const config = require("config");
const apiKey = config.get('steam-key')
const SteamAPI = require('steamapi');
const steam = new SteamAPI(apiKey );
const SteamUser = require('steam-user');
const steamUser = new SteamUser();


exports.getNews = async (req,res)=>{
    // const news =  await fetch('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=3').catch((e)=>{
    //     console.log(e.message)
    // }) 
    // let resNews = await news.json()
    const pack = await steamUser.getProductInfo([990080],[822363]).catch(e => console.log(e.message))
    console.log(pack)
    // res.send(resNews)
}