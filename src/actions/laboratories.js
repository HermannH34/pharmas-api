import { db } from '../database.js'

export const listLabs = (req, res) => {
  const labs = db.prepare('SELECT * FROM laboratories').all();

  res.send(labs)
}

export const createProduct = (req, res) => {
  const product = JSON.parse(req.body).product;
  const labId = req.params.id;

  db.prepare('INSERT INTO products (name, laboratoryid) VALUES (?, ?)').run(
    product, labId
  )

  res.send()
}
