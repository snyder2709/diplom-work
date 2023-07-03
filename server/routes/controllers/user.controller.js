const config = require("config");
const apiKey = config.get('steam-key')
const SteamAPI = require('steamapi');
const steam = new SteamAPI(apiKey);
const jwt = require('jsonwebtoken');
const secret = config.get('secretKey');
const SteamUser = require('steam-user');
const steamUser = new SteamUser();
const asyncHandler = require("express-async-handler");
let steamGuardCode = '';
let timeOut =  setTimeout(()=>{
},30000)


exports.enterSteamGuardCode =  async ( req, res) => {
    
    const codeAwait = new Promise((res,rej)=>{
        res(req.body.code);
    })
    steamUser.on('steamGuard', async (domain, callback, lastCodeWrong) => {
        console.log(`Код отправлен на домен ${domain}`);
        need_code = true
        // res.send(need_code)
       setTimeout(()=>{
        },30000)
        try {
            let code  = await codeAwait
            console.log(code)
            callback(code); // Передаем код SteamGuard
        } catch (error) {
            console.log(error);
            callback(''); // Если произошла ошибка, передаем пустой код SteamGuard
        }
    });

};




exports.logOn = async (req, res) => {
    const { username, password, } = req.body;
    let need_code = false;
    try {
        // Вход в Steam с использованием учетных данных пользователя
        steamUser.logOn({
            accountName: username,
            password: password,
            rememberPassword: false,
            dontRememberMachine: true
        });
    
    }
    catch (err) {
        console.log(err.message)
        // Событие, которое срабатывает при ошибке авторизации в Steam
        steamUser.on('error', (err) => {
            console.error('Steam login error:', err);
            res.status(500).json({ error: 'Steam login error' });
        });
    }
};



exports.loggedOn = async (req, res) => {
    let steamIdAwait = new Promise((resolve) => {
        steamUser.on('loggedOn', async () => {
            const steamId = steamUser.steamID.getSteamID64();
            resolve(steamId);
        });
    }).catch(e => console.log(e.message));

    const steamId = await steamIdAwait
    const accessToken = jwt.sign({ steamId }, secret, { expiresIn: '200d' });
    res.setHeader('Authorization', `Bearer ${accessToken}`).send(steamId);
}




exports.authorization = async (req, res) => {
    try {
        const steamId = req.userId.steamId
        const userSummaries = await steam.getUserSummary(steamId)
        res.send(userSummaries)
    }
    catch (err) {
        res.status(401).json({ error: 'Не авторизован' });
    }
}
exports.logout = (req, res) => {
    try {
        steamUser.logOff();
        res.json("Пользователь покинул сессию");
    }
    catch (err) {
        res.status(401).json({ error: 'Ошибка сервера ' });
    }
}



