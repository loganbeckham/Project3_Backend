const express = require('express')
<<<<<<< HEAD
// const mongoose = require('mongoose')
const cors = require('cors')
=======
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const Location = require('./models/locations.js')
>>>>>>> d28213f8d38cf71c5ad5761b14ac5abaa89bdeab

const app = express();

app.use(express.json())
<<<<<<< HEAD
app.use(cors())

let PORT = 3000
if(process.env.PORT) {
    PORT = process.env.PORT
}

app.get('/', (req, res) => {
    res.send('hi');
})
=======
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
>>>>>>> d28213f8d38cf71c5ad5761b14ac5abaa89bdeab


// =======================================
//              LISTENER
// =======================================

<<<<<<< HEAD

app.listen(PORT, () => {
    console.log(`App listening on port: 3000`)
  });
=======
const mongodbURI = process.env.MONGODBURI

mongoose.connect(`${mongodbURI}`, () => {
    console.log('connected to mongo')
})

if(process.env.PORT) {
    PORT = process.env.PORT
}

app.listen(PORT, () => {
    console.log(`App listening on port: 3000`)
  });
>>>>>>> d28213f8d38cf71c5ad5761b14ac5abaa89bdeab
