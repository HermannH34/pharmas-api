import fastify from "fastify"
import { listPharms } from './actions/pharmacies.js'
import { listByCity } from './actions/pharmacies.js'
import { listLabs } from './actions/laboratories.js'

const app = fastify()

// afficher tous les labos
app.get('/laboratories', listLabs)

// afficher toutes les pharmas
app.get('/pharmacies', listPharms)
// afficher les pharmas par ville
app.get('/pharmacies/:city', listByCity)

// afficher toutes les pharmas
// app.get('/pharmacies/', listPharms)

const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
