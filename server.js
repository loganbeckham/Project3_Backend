const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('hi');
})


// =======================================
//              LISTENER
// =======================================

// const mongodbURI = process.env.MONGODBURI

mongoose.connect('mongodb+srv://NYC_Mat:v1kZxgtLPzrlmSn0@travelapp.gfyzcwn.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})

if(process.env.PORT) {
    PORT = process.env.PORT
}

app.listen(PORT, () => {
    console.log(`App listening on port: 3000`)
  });
