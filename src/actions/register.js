import { db } from '../database.js'

export const register = (req, res) => {
  const { name, email, password, ispharmacy } = req.body

  if (db.prepare('SELECT * FROM users WHERE email = ?').all(email).length == 1) return res.status(401).send('user already exist')

  res.send(db.prepare('INSERT INTO users (name, email, password, ispharmacy) VALUES (?, ?, ?, ?)').run(
    name, email, password, ispharmacy
  ))
}
