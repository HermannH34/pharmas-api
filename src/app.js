import fastify from "fastify"
import fastifySwagger from '@fastify/swagger'
import { listByCity } from './actions/pharmacies.js'
import { listLabs } from './actions/laboratories.js'
import { order } from './actions/orders.js'

const app = fastify()


// index
app.get('/', (req, res) => {
  res.send({ "status": "everyhing is allright" })
})
// afficher tous les labos
app.get('/pharmacy/:id/laboratory', listLabs)
// afficher les pharmas par ville
app.get('/laboratory/:id/pharmacy', listByCity)
// une pharma peut passer commande auprès d'un labo
app.post('/pharmacy/:id/order', order)

export default app
