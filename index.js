const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');

const appConfig = require('./config')
const actions = require('./actions');   
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'test', cookie: { maxAge: 60000 } }));


app.post('/login', actions.login)
app.post('/signup', actions.signup)
app.get('/pets', actions.listPets)
app.get('/pets/:id', actions.viewPet)
app.post('/pets/:id/buy', actions.buyPet)
app.get('/me', actions.viewMyAccount)
app.get('/me/pets', actions.viewMyPets)
app.post('/pets', actions.addPet)


app.listen(appConfig.HTTP_PORT, () => {
    console.log('running')
    console.info(`Server started on ${appConfig.HTTP_PORT}`)
})
