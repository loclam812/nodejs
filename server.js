const express = require('express')
const Mongoose = require('mongoose')
const BodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080
const url = "mongodb+srv://loclam812:Abc@12345678@cluster0.nxpqw.mongodb.net/information_employee?retryWrites=true&w=majority"
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors(corsOptions));
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

const Information = Mongoose.model("information", {
  data: Array
});

app.get('/get-information', async (req, res) => {
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
