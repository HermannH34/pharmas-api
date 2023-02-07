import { db } from '../database.js'

export const listPharms = (req, res) => {
  const pharms = db.prepare('SELECT * FROM pharmacies').all();

  res.send(pharms);
}


export const listByCity = (req, res) => {
  const pharms = db.prepare('SELECT * FROM pharmacies WHERE city = ?').all(req.params.city);

  res.send(pharms.map(pharm => pharm["name"]));
}
