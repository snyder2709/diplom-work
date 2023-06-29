const config = require("config");
const apiKey = config.get('steam-key')
const SteamAPI = require('steamapi');
const steam = new SteamAPI(apiKey);
const jwt = require('jsonwebtoken');
const secret = config.get('secretKey');
const SteamUser = require('steam-user');
const steamUser = new SteamUser();
const asyncHandler = require("express-async-handler");
let steamGuardPromise = null;


exports.enterSteamGuardCode = asyncHandler(async (req, res) => {
    console.log('МЕНЯ ЗАПУСТИЛО СОБЫТИЕ STEAMGUARD');
    const code = req.body.code;
    if (steamGuardPromise) {
        // Если уже есть активный промис, завершаем его с ошибкой
        steamGuardPromise.reject(new Error('Новый код SteamGuard был введен'));
    }
    steamGuardPromise = createSteamGuardPromise(code); // Создаем новый промис с кодом SteamGuard
    res.send('Код SteamGuard сохранен');
});

steamUser.on('steamGuard', async (domain, callback, lastCodeWrong) => {
    console.log(`Код отправлен на домен ${domain}`);
    try {
        const code = await steamGuardPromise; // Ожидаем завершения промиса и получаем код SteamGuard
        console.log(code);
        callback(code); // Передаем код SteamGuard
    } catch (error) {
        console.log(error);
        callback(''); // Если произошла ошибка, передаем пустой код SteamGuard
    }
});

// Функция для создания промиса с кодом SteamGuard
function createSteamGuardPromise(code) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(code); // Завершаем промис с кодом SteamGuard
            steamGuardPromise = null; // Очищаем промис
        }, 5000); // Установите здесь необходимую задержку для ввода кода на клиенте
    });
}

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
        const details = await steamUser.getSteamGuardDetails((request) => request);
        console.log(details)
        if (details.isSteamGuardEnabled) {
            need_code = true
        }
        res.send(need_code)
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



