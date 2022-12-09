const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

let PORT = 3000
if(process.env.PORT) {
    PORT = process.env.PORT
}

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(PORT, () => {
    console.log('listening')
})