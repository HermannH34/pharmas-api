import { db } from '../database.js'

export const listByCity = (req, res) => {
  const city = req.query.city;

  if (!city) return res.code(400).send({ error: 'You must query a city' })

  const pharms = db.prepare('SELECT * FROM pharmacies WHERE city = ?').all(city);

  if (pharms.length == 0) return res.code(404).send({ error: 'We have no pharmacy in this city OR you must query a valid city' })

  res.send(pharms.map(pharm => pharm["name"]));
}
