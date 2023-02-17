import { db } from '../database.js'
import * as dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken
dotenv.config()
// user pour l'authotification
let user
// Générer un Token pour s'authentifier
function generateAccesToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1800s' })
}
dotenv.config()

export const login = (req, res) => {
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

  res.send({ accessToken })
}
