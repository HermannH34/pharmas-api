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


let user

// Générer un Token pour s'authentifier
function generateAccesToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1800s' })
}


// index
app.get('/', authenticateToken, (req, res) => {
  res.send({ "status": "everyhing is allright" })
})
// login
app.post('/login', (req, res) => {
  const { email, password } = req.body

  user = db.prepare('SELECT * FROM laboratories WHERE email = ? AND password = ?').all(
    email, password
  )[0]

  if (email !== user.email || password !== user.password) {
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
