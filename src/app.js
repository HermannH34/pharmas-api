import express from "express"
import { listByCity } from './actions/pharmacies.js'
import { listLabs } from './actions/laboratories.js'
import { order } from './actions/orders.js'
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const jwt = jsonwebtoken

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const user = {
  id: 42,
  name: "Servier",
  email: "servier-lab@gmail.com"
}

// Générer un Token pour s'authentifier
function generateAccesToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1800s' })
}


// index
app.get('/', (req, res) => {
  // res.send({ "status": "everyhing is allright" })
  return request.user
})
// login
app.post('/login', (req, res) => {
  if (req.body.email !== user.email || req.body.password !== 'azerty') {
    return res.status(401).send('invalid credentials');
  }

  const accessToken = generateAccesToken(user)
  res.send({ accessToken })
})
// afficher tous les labos
app.get('/pharmacy/:id/laboratory', listLabs)
// afficher les pharmas par ville
app.get('/laboratory/:id/pharmacy', listByCity)
// une pharma peut passer commande auprès d'un labo
app.post('/pharmacy/:id/order', order)

// app.addHook("onRequest", async (req, res) => {
//   try {
//     await req.generateAccesToken(user)
//   } catch (err) {
//     res.send(err)
//   }
// })

export default app
