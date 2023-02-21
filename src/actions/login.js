import { db } from '../database.js'
import * as dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from "bcrypt"

const jwt = jsonwebtoken
dotenv.config()
// user pour l'authentification
let user
// Générer un Token pour s'authentifier
function generateAccesToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '7200s' })
}
dotenv.config()

export const login = (req, res) => {
  const { email, password } = req.body
  console.log(email)

  !email && !password && res.status(401).send('missing informations in the body')

  const hash = db.prepare('SELECT password FROM users WHERE email = ?').all(
    email
  )[0].password

  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      user = db.prepare('SELECT * FROM users WHERE email = ?').all(
        email
      )[0]

      const accessToken = generateAccesToken(user)
      return res.send({ accessToken })
    } else {
      res.status(401).send('invalid credentials')
    }
  });
}
