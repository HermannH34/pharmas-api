import { db } from '../database.js'

export const listLabs = (req, res) => {
  !req.user && res.status(401).send('invalid credentials')

  res.send(db.prepare('SELECT * FROM laboratories').all())
}
