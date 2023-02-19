import { db } from '../database.js'

export const createPharma = (req, res) => {
  // verifier si user est un pharmacien
  if (!req.user || req.user.ispharmacy == 'false') return res.status(401).send('invalid credentials')

  res.send(db.prepare('INSERT INTO pharmacies (name, city) VALUES (?, ?)').run(
    req.body.name, req.body.city
  ))
}

// checker si pharmacie existe
// créer un vrai boolean
// gérer les réponse positives (messages)
