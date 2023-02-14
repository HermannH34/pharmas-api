import fastify from "fastify"
import { listByCity } from './actions/pharmacies.js'
import { createProduct, listLabs } from './actions/laboratories.js'
import { order } from './actions/orders.js'

const app = fastify()
// Options
const getLabsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  }
}
// index
app.get('/', (req, res) => {
  res.send({ "status": "everyhing is allright" })
})
// afficher tous les labos depuis
app.get('/api/v1/pharmacy/:id/laboratories', getLabsOpts, listLabs)
// un labo peut créer un produit
app.post('/api/v1/laboratory/:id', createProduct)
// afficher les pharmas par ville
app.get('/api/v1/laboratory/:id/pharmacies', listByCity)
// une pharma peut passer commande auprès d'un labo
app.post('/api/v1/pharmacy/:id/order', order)

export default app
