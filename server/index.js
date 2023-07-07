const config = require("config");
const express = require("express");
const app = express();
const cors = require('cors')
const PORT = config.get('serverPort')
const gameRoutes = require('./routes/game.routes')
const userRoutes = require('./routes/user.routes')
const newsRoutes = require('./routes/news.routes')

app.use(express.json())
app.use(cors({
  exposedHeaders: ['Authorization','Referrer-Policy']
}));

app.use("/gameAPi",gameRoutes);
app.use("/user",userRoutes);
app.use("/news",newsRoutes);



const start = async () => {
  try {
      app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`);
      })
  } catch (e) {
      console.log(e)
  }
}
start()

