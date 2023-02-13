import fastify from "fastify"
import { listPharms } from './actions/pharmacies.js'
import { listByCity } from './actions/pharmacies.js'
import { createProduct, listLabs } from './actions/laboratories.js'
import { order } from './actions/orders.js'
import fastifyView from "@fastify/view"
import ejs from 'ejs'

const app = fastify()

app.register(fastifyView, {
  engine: {
    ejs
  },
});

// index
app.get('/', (req, res) => {
  res.send({ "status": "everyhing is allright" })
})
// afficher tous les labos
app.get('/laboratories', listLabs)
// un labo peut créer un produit
app.put('/laboratory/:id', createProduct)
// afficher toutes les pharmas
app.get('/pharmacies', listPharms)
// afficher les pharmas par ville
app.get('/pharmacies/:city', listByCity)
// une pharma peut passer commande auprès d'un labo
app.put('/pharmacy/:id/order', order)

export default app
