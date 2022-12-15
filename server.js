const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const app = express();
require('dotenv').config()

app.use(express.json())
app.use(cors(
    {
		origin:'http://localhost:3001',
		credentials:true
	}
))
app.use(
	session({
		secret: 'feedmeseymour', //a random string do not copy this value or your stuff will get hacked
		resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
		saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
	})
)

//login
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

const Location = require('./models/locations.js')



app.post('/locations' , (req, res) => {
    Location.create(req.body, (err, createdLocation) =>{
        res.json(createdLocation)
        console.log(req.body)
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
