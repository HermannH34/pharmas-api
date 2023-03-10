import { db } from '../database.js'

export const createLab = (req, res) => {
  const { name } = req.body
  if (!name) return res.status(401).json('invalid body')
  // verifier si user est un pharmacien ou si pharmacie déjà créée
  const checkLab = db.prepare('SELECT name FROM laboratories WHERE name = ?').all(name);
  if (req.user.ispharmacy == 'true' || checkLab.length !== 0) return res.status(401).json('invalid credentials OR user not a pharmacy OR pharmacy already exist')

  res.status(201).json(db.prepare('INSERT INTO laboratories (name, userid) VALUES (?, ?)').run(
    name, req.user.id
  ))
}
