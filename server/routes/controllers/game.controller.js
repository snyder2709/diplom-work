const  searchByName  = require('../../utils/elastic');
const config = require("config");
const apiKey = config.get('steam-key')
const SteamAPI = require('steamapi');
const steam = new SteamAPI(apiKey );


exports.getAppId = async (req,res) =>{
    try{

        const app = await steam.getGameDetails(req.body.id,false,"rus");
        res.send(app)
    }catch(error){
        console.log(error.message)
        res.status(500).send('App not found');
    }
}

exports.getTopGames = async (req, res) => {
    try {
        let responceData = await steam.getFeaturedCategories();
        responceData = responceData.filter(game => game.name === "Top Sellers")
        const sendData = await getDetailsById(responceData[0])
        res.send(sendData)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}


// функция для получения деталей игр принимает массив с обязательным полем items
// примечание : функция возвращает чистый ответ без повторяющихся элементов и так же возращает объекты со  status.fulfiled
async function getDetailsById(array) {
    if(array){
        const arrayId = [];
        let fulfiledGameDetails = [];
        array.items.forEach(game => arrayId.push(game.id.toString()));
        const requestsDetails = arrayId.map(id => steam.getGameDetails(id));
        const gamesDetails = await Promise.allSettled(requestsDetails);
        gamesDetails.forEach((gD) => {
            if (gD.status === "fulfilled") {
                fulfiledGameDetails.push(gD.value)
            } else {
                return fulfiledGameDetails
            }
        })
        //  фильтруем массив для сохранение только уникальных значений
        fulfiledGameDetails = fulfiledGameDetails.filter((item, index, self) => {
            return index === self.findIndex((elem) => elem.name === item.name);
        });
        return fulfiledGameDetails
    }
}



// запрос на получение категории топ продаж
exports.getFeaturedCategories = async (req, res) => {
    try {
        const responceData = await steam.getFeaturedCategories();
        res.status(200).json(responceData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

//  поисковой запрос
  exports.getSearchAppList = async (req, res) => {
    const query = req.query.q
    try{
      const search = await searchByName(query)
      res.send(search)
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
  };
