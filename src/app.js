import express from "express"
import { listByCity } from './actions/pharmacies.js'
import { listLabs } from './actions/laboratories.js'
import { order } from './actions/orders.js'
import { login } from './actions/login.js'
import { register } from './actions/register.js'
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const jwt = jsonwebtoken

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register
app.post('/api/register', register)
// login
app.post('/api/login', login)
// afficher tous les labos
app.get('/api/laboratories', authenticateToken, listLabs)
// afficher les pharmas par ville
app.get('/api/pharmacies', authenticateToken, listByCity)
// un user peut créer une pharma

// une pharma peut passer commande auprès d'un labo
app.post('/api/order', authenticateToken, order)

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
