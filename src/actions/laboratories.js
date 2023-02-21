import { db } from '../database.js'

export const listLabs = (req, res) => {
  !req.user && res.status(401).json('invalid credentials')

  res.json(db.prepare('SELECT * FROM laboratories').all())
}
