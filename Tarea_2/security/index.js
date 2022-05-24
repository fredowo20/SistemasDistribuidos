const express = require('express')
const cors = require("cors");
const app = express()
const port = 5000

const data = require("./banned.json")

app.use(cors());

app.use(express.json())
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9092');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: [process.env.kafkaHost/*, 'localhost:9093', 'localhost:9094'*/]
})

const consumer = kafka.consumer({ groupId: 'test-group' })

app.get('/blocked', async (req, res) => {
  res.json(data)
})

let tmp = []
const messageAction = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      const mensaje = { "user": message.value.toString(), "time": message.timestamp }

      tmp.push(mensaje)
      //console.log(tmp.filter((obj) => obj["user"]==message.value.toString()))

      if(data['users-blocked'].includes(message.value.toString())==false){
        
        console.log(message.value.toString()+" no bloqueado")
        
        if((tmp.filter((obj) => obj["user"]==message.value.toString())).length>=5){
          
          if(parseInt((tmp.filter((obj) => obj["user"]==message.value.toString()))[(tmp.filter((obj) => obj["user"]==message.value.toString())).length-1]["time"])-parseInt((tmp.filter((obj) => obj["user"]==message.value.toString()))[(tmp.filter((obj) => obj["user"]==message.value.toString())).length-5]["time"]) <= 60000){
            
            console.log("Se ha bloqueado por exceso de intentos")
            data['users-blocked'].push(message.value.toString())
            tmp = [];
          
          }else{
            console.log("No se bloquea la cuenta")
          }
          
        }
      }else{
        console.log(message.value.toString()+" bloqueado")
      }
    },
  })
}
messageAction().catch(console.error)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
