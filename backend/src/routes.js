const express = require('express')
const routes = express.Router()
const OngController = require('./controllers/OngController')
const IncedentController = require('./controllers/IncedentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.post('/sessions', SessionController.create)



routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncedentController.index)
routes.post('/incidents', IncedentController.create)
routes.delete('/incidents/:id', IncedentController.delete)
module.exports = routes