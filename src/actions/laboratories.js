import { db } from '../database.js'

export const listLabs = (req, res) => {
  // vérifier si user est bien une pharam
  if (req.user.labo) return res.status(401).send('invalid credentials')

  const labs = db.prepare('SELECT * FROM laboratories').all();

  res.send(labs)
}
