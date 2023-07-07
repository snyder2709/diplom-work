const config = require("config");
const apiKey = config.get('steam-key')
const SteamAPI = require('steamapi');
const steam = new SteamAPI(apiKey);
const jwt = require('jsonwebtoken');
const secret = config.get('secretKey');
const SteamUser = require('steam-user');
const clientOptions = {
    enablePicsCache: true,
};
const steamUser = new SteamUser(clientOptions);



exports.enterSteamGuardCode = ( req, res) => {
    // const codeAwait = new Promise((res,rej)=>{
    //     res(req.body.code);
    // })
    // steamUser.on('steamGuard', async (domain, callback, lastCodeWrong) => {
    //     console.log(`Код отправлен на домен ${domain}`);
    //    setTimeout(()=>{
    //     },30000)
    //     try {
    //         let code  = await codeAwait
    //         console.log(code)
    //         callback(code); // Передаем код SteamGuard
    //     } catch (error) {
    //         console.log(error);
    //         callback(''); // Если произошла ошибка, передаем пустой код SteamGuard
    //     }
    // });

};




exports.logOn =  (req, res) => {
    const { username, password, } = req.body;
    try {
        // Вход в Steam с использованием учетных данных пользователя
        steamUser.logOn({
            accountName: username,
            password: password,
            rememberPassword: false,
            dontRememberMachine: true
        });
    
       
        steamUser.on('loggedOn', (details) => {
            console.log(details)
            const steamId = steamUser.steamID.getSteamID64();
            const accessToken = jwt.sign({ steamId }, secret, { expiresIn: '200d' });
            
            res.setHeader('Authorization', `Bearer ${accessToken}`).send(steamId);
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


exports.getOwnedApps = async  (req, res) => {
    try {
        const steamId = req.userId.steamId
        console.log('запрос на игры ')
         steam.getUserOwnedGames(steamId).then((data)=>{
            console.log(data)
         })
        
    }
    catch (err) {
        res.status(401).json({ error: 'Ошибка сервера' });
    }
}


exports.requestFreeLicense = (req, res) => {
    try {
        const steamId = req.userId.steamId
        if(steamId) {
            const appIds = req.body.appIds
            console.log(appIds)
            console.log('запрос на покупку игры')
            steamUser.requestFreeLicense(appIds,(err,grantedPackageIds )=>{
                if(!err){
                    console.log(grantedPackageIds)
                }

            })
        }
        else{
            res.status(401).json({error:'Unauthorized'})
        }
            
        
    }
    catch (err) {
        res.status(401).json({ error: 'Ошибка сервера' });
    }
}


