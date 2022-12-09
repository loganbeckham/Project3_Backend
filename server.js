const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

if(process.env.PORT) {
    PORT = process.env.PORT
}

app.get('/', (req, res) => {
    res.send('hi');
})


// =======================================
//              LISTENER
// =======================================


app.listen(PORT, () => {
    console.log(`App listening on port: 3000`)
  });
