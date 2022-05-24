const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

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
  clientId: 'my-producer',
  brokers: ['localhost:9092'/*, 'localhost:9093', 'localhost:9094'*/]
})

const producer = kafka.producer()

app.post('/login', async (req, res) => {
  const {user, pass} = req.body
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test',
    messages: [
      { value: user }
    ],
  })
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})