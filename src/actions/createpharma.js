import { db } from '../database.js'

export const createPharma = (req, res) => {
  const { name, city } = req.body
  // verifier si user est un pharmacien ou si pharmacie déjà créee
  const checkPharma = db.prepare('SELECT name FROM pharmacies WHERE name = ?').all(name);

  if (!req.user || req.user.ispharmacy == 'false' || checkPharma.length !== 0) return res.status(401).send('invalid credentials OR user not a pharmacy O0 pharmacy already exist')

  res.send(db.prepare('INSERT INTO pharmacies (name, city) VALUES (?, ?)').run(
    name, city
  ))
}
