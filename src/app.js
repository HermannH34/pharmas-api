import fastify from "fastify"
import { listPharms } from './actions/pharmacies.js'
import { listByCity } from './actions/pharmacies.js'
import { createProduct, listLabs } from './actions/laboratories.js'
import { order } from './actions/orders.js'

const app = fastify()

// index
app.get('/', (req, res) => {
  res.send({ "status": "everyhing is allright" })
})
// afficher tous les labos depuis
app.get('/api/v1/pharmacy/:id/laboratories', listLabs)
// un labo peut créer un produit
app.post('/api/v1/laboratory/:id', createProduct)
// afficher toutes les pharmas
app.get('/api/v1/laboratory/:id/pharmacies', listPharms)
// afficher les pharmas par ville
app.get('/api/v1/pharmacies/:city', listByCity)
// une pharma peut passer commande auprès d'un labo
app.post('/api/v1/pharmacy/:id/order', order)

export default app
