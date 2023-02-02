import { db } from '../database.js'

export const listPharms = (req, res) => {
  const pharms = db.prepare('SELECT * FROM pharmacies').all();

  res.send(JSON.stringify(pharms))
}
