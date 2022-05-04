const {Pool} = require('pg')

const pool = new Pool({
  user: 'sisdis', 
  host: process.env.POSTGRES_HOST, 
  database: 'sisdb', 
  password: 'sispass', 
  port: 5432, //3211 por si no funciona xd
})

const express = require("express");
const cors = require("cors");
const grpc = require("./grpc_client");
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

const port = 3000;
const app = express();

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,   
    port: 6379
});

redisClient.on("error", function(error) {
    console.error(error);
});
  
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000
    }
}));

app.get("/inventory/search", async (req, res) => {
  redisClient.get(req.query.name ,function(err,reply){
  
    if(reply!=null){
      const parsed = JSON.parse(reply);
      res.json(parsed);
    
    }else{
      app.use(cors());
      app.use(express.json());
  
      const item = req.query.name;
      if (item) {
        grpc.GetItem({name: item}, (error, items) => {
            if (error){
                console.log(error);
                res.json({});
            } res.json(items);
              redisClient.set(req.query.name, JSON.stringify(items));
        })
      }

     
    }
  });
});

app.listen(port, () => {
  console.log(`API RUN AT http://localhost:${port}`);
});
