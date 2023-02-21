import { db } from '../database.js'

export const sale = (req, res) => {
  // vérifier si user est une pharma
  req.user.ispharmacy !== "true" && res.status(401).send('user must be a pharmacian')

  const { product } = req.body;

  !product && res.status(400).send('product is required')

  const pharmaId = db.prepare('SELECT id FROM pharmacies WHERE userid = ?').all(
    req.user.id
  )[0].id


  const productId = db.prepare('SELECT id FROM products WHERE name = ?').all(
    product
  )[0].id

  db.prepare('INSERT INTO sales (productid, pharmacyid) VALUES (?, ?)').run(
    productId,
    pharmaId
  )
  res.status(201)
  res.json(`DataReceived: ${product}`)
}
