const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const Location = require('./models/locations.js')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
mongoose.set('strictQuery', true)




app.post('/locations' , (req, res) => {
    Location.create(req.body, (err, createdLocation) =>{
        res.json(createdLocation)
    });
});

            //GET ROUTE//

app.get('/locations', (req, res) => {
    Location.find({}, (err, foundLocations) => {
        res.json(foundLocations)
    })
});

            ///DELETE ROUTE///
app.delete('/locations/:id', (req, res) => {
    Location.findByIdAndRemove(req.params.id, (err, deletedLocation) => {
        res.json(deletedLocation);
    });
});

            ///UPDATE ROUTE ///

app.put('/locations/:id', (req, res) => {
    Location.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedLocation) => {
        res.json(updatedLocation)
    })
});


// =======================================
//              LISTENER
// =======================================

const mongodbURI = process.env.MONGODBURI

mongoose.connect(`${mongodbURI}`)

mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})

if(process.env.PORT) {
    PORT = process.env.PORT
}

app.listen(PORT, () => {
    console.log(`App listening on port: 3000`)
  });
