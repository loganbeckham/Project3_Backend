const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()

const Location = require('./models/locations.js')

const app = express();


const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

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

        //SHOW ROUTE//
app.get('/locations/:id', (req, res) => {
    Location.findById(req.params.id, (err, foundLocation) => {
        res.json(foundLocation);
    })
})

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

mongoose.connect(`mongodb+srv://NYC_MAT:c4H9qtWTr0eMPEaK@travelapp.gfyzcwn.mongodb.net/?retryWrites=true&w=majority`)

mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})

if(process.env.PORT) {
    PORT = process.env.PORT
}

app.listen(PORT, () => {
    console.log(`App listening on port: 3000`)
  });
