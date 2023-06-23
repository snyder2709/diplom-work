const config = require("config");
const apiKey = config.get('steam-key')
const SteamAPI = require('steamapi');
const steam = new SteamAPI(apiKey);
const jwt = require('jsonwebtoken');
const secret = config.get('secretKey');
const SteamUser = require('steam-user');
const { request } = require("express");
const steamUser = new SteamUser();


// Функция для ввода кода Steam Guard
exports.enterSteamGuardCode = async (req, res) => {
    const  {code} = req.body
    console.log(code)
    res.send("Пароль получен")
    return new Promise(resolve => resolve(code)).catch((e) => {
        console.log(e.message)
    })
};



exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Вход в Steam с использованием учетных данных пользователя
        steamUser.logOn({
            accountName: username,
            password: password,
            rememberPassword:false,
            dontRememberMachine:true
        });
        const codeAwait = async (code) =>{ 
            return new Promise((resolve)=> {
            if(code){
                resolve(code)
            }else{
                code = null
            }
        }).catch(e => console.log(e.message))
    }
        let steamIdAwait = new Promise((resolve) => {
            steamUser.on('loggedOn', async () => {
                const details = await steamUser.getSteamGuardDetails((request) => request);
                console.log(details)
                if (details.isSteamGuardEnabled) {
                    console.log('Требуется код Steam Guard');
                    const steamId = steamUser.steamID.getSteamID64();
                    resolve(steamId);
                }
            });
        }).catch(e => console.log(e.message));


        const steamId = await steamIdAwait
        const accessToken = jwt.sign({ steamId }, secret, { expiresIn: '200d' });
        res.setHeader('Authorization', `Bearer ${accessToken}`).send( await codeAwait());
        console.log("аутентефикация прошла держи токен");
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

      steamUser.on('steamGuard', async (domain, callback,lasCodeWrong) => {
                        console.log(`код отправлен на домен ${domain}`);
                        let code = await exports.enterSteamGuardCode()
                         await codeAwait(code) 
                        callback(code)
                    });



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
        res.json("ПОльзователь покинул сессию");
    }
    catch (err) {
        res.status(401).json({ error: 'Ошибка сервера ' });
    }
}



