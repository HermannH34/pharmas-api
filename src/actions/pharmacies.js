import { db } from '../database.js'

export const listByCity = (req, res) => {
  const pharms = db.prepare('SELECT * FROM pharmacies WHERE city = ?').all(req.query.city);

  res.send(pharms.map(pharm => pharm["name"]));
}
