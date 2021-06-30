const express = require('express')
const Mongoose = require('mongoose')
const BodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080
const url = "mongodb://localhost:27017/information_employee"
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

Mongoose.connect(url);

// app.use(cors(corsOptions));
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

const Information = Mongoose.model("information", {
  data: Array
});

app.get('/get-information', cors(corsOptions), async (req, res) => {
  try {
    const result = await Information.find().exec()

    res.send(result[0].data)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/get-information-1', async (req, res) => {
  try {
    const result = await Information.find().exec()

    res.send(result[0].data)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`todo list RESTful API server started on: ${port}`)
})
