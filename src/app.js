import express from "express"
import { listByCity } from './actions/pharmacies.js'
import { listLabs } from './actions/laboratories.js'
import { order } from './actions/orders.js'
import { login } from './actions/login.js'
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const jwt = jsonwebtoken

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// index
app.get('/', (req, res) => {
  res.send({ "status": "everyhing is allright" })
})
// login
app.post('/login', login)
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
