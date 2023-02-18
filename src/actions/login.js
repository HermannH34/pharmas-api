import { db } from '../database.js'
import * as dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken
dotenv.config()
// user pour l'authentification
let user
// Générer un Token pour s'authentifier
function generateAccesToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1800s' })
}
dotenv.config()

export const login = (req, res) => {
  user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').all(
    req.body.email, req.body.password
  )[0]

  user == undefined && res.status(401).send('invalid credentials')

  const accessToken = generateAccesToken(user)

  res.send({ accessToken })
}
