import { db } from '../database.js'

export const listByCity = (req, res) => {
  !req.user && res.status(401).send('invalid credentials')

  const city = req.query.city;

  !city && res.status(400).json({ error: 'You must query a city' })

  const pharms = db.prepare('SELECT * FROM pharmacies WHERE city = ?').all(city);

  pharms.length == 0 && res.status(404).json({ error: 'We have no pharmacy in this city OR you must query a valid city' })

  res.send(pharms.map(pharm => pharm["name"]));
}
