import { db } from '../database.js'

export const createPharma = (req, res) => {
  const { name, city } = req.body
  if (!name || !city) return res.status(401).send('invalid body')
  // verifier si user est un pharmacien ou si pharmacie déjà créée
  const checkPharma = db.prepare('SELECT name FROM pharmacies WHERE name = ?').all(name);
  if (!req.user || req.user.ispharmacy == 'false' || checkPharma.length !== 0) return res.status(401).send('invalid credentials OR user not a pharmacy OR pharmacy already exist')

  res.status(201).send(db.prepare('INSERT INTO pharmacies (name, city, userid) VALUES (?, ?, ?)').run(
    name, city, req.user.id
  ))
}
