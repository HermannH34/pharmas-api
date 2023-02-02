import { db } from '../database.js'

export const listLabs = (req, res) => {
  const labs = db.prepare('SELECT * FROM laboratories').all();

  res.send(JSON.stringify(labs))
}
