import express from "express"
import { listByCity } from './actions/pharmacies.js'
import { listLabs } from './actions/laboratories.js'
import { order } from './actions/orders.js'
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { db } from "./database.js"
dotenv.config()

const jwt = jsonwebtoken

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user pour l'authotification
let user
// Générer un Token pour s'authentifier
function generateAccesToken(user) {
  console.log('x')
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1800s' })
}


// index
app.get('/', (req, res) => {
  res.send({ "status": "everyhing is allright" })
})
// logins
app.post('/login', (req, res) => {
  const { email, password } = req.body
  let labQuery = db.prepare('SELECT * FROM laboratories WHERE email = ? AND password = ?').all(
    email, password
  )[0]

  let pharmaQuery = db.prepare('SELECT * FROM pharmacies WHERE email = ? AND password = ?').all(
    email, password
  )[0]

  if (pharmaQuery !== undefined) {
    user = pharmaQuery
  } else if (labQuery !== undefined) {
    user = labQuery
  } else {
    return res.status(401).send('invalid credentials')
  }

  const accessToken = generateAccesToken(user)
  console.log(labQuery)
  res.send({ accessToken })
})


// afficher tous les labos
app.get('/pharmacy/:id/laboratory', authenticateToken, listLabs)
// afficher les pharmas par ville
app.get('/laboratory/:id/pharmacy', authenticateToken, listByCity)
// une pharma peut passer commande auprès d'un labo
app.post('/pharmacy/:id/order', authenticateToken, order)

// Middleware pour gérer les routes nécessitant une authentification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {

    if (err) return res.sendStatus(401);

    req.user = user;
    next();
  });
}

export default app
