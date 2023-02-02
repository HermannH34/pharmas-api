import { db } from '../database.js'

export const listPharms = (req, res) => {
  const pharms = db.prepare('SELECT * FROM pharmacies').all();

  res.send(JSON.stringify(pharms))
}


export const listByCity = (req, res) => {
  const pharms = db.prepare('SELECT * FROM pharmacies WHERE city = ?').all(req.params.city);

  res.send(JSON.stringify(pharms.map(pharm => pharm["name"])))
}
