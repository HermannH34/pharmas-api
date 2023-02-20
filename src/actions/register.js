import { db } from '../database.js'
import bcrypt from "bcrypt"


export const register = (req, res) => {
  const { name, email, password, ispharmacy } = req.body

  if (!name || !email || !password || !ispharmacy) return res.status(401).send('invalid body')

  if (db.prepare('SELECT * FROM users WHERE email = ?').all(email).length == 1) return res.status(401).send('user already exist')

  // crypter le password
  bcrypt.hash(password, 10, function (err, hash) {
    res.status(201).send(db.prepare('INSERT INTO users (name, email, password, ispharmacy) VALUES (?, ?, ?, ?)').run(
      name, email, hash, ispharmacy
    ))
  });
}
