import fastify from "fastify"
import { listPharms } from './actions/pharmacies.js'
import { listByCity } from './actions/pharmacies.js'
import { listLabs } from './actions/laboratories.js'
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
  res.view("templates/index.ejs")
})
// afficher tous les labos
app.get('/laboratories', listLabs)

// afficher toutes les pharmas
app.get('/pharmacies', listPharms)
// afficher les pharmas par ville
app.get('/pharmacies/:city', listByCity)

const host = '0.0.0.0';

const start = async () => {
  try {
    await app.listen(process.env.PORT || 5000, host)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
