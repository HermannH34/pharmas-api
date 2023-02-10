import { db } from '../database.js'
import { hasard } from '../hasard.js'

export const order = (req, res) => {
  const pharmaId = req.params.id;

  const query = req.query;
  const productQuery = query.product;
  const laboratoryQuery = query.laboratory;
  // trouver le produit commandé par la pharma
  let product = db.prepare('SELECT * FROM products WHERE name = ? AND laboratoryid = (SELECT id FROM laboratories WHERE name = ?)').all(
    productQuery, laboratoryQuery
  )
  product = hasard(product)
  // insérer ce produit dans orders
  db.prepare('INSERT INTO orders (title, productid, pharmacyid) VALUES (?, ?, ?)').run(
    query.title,
    product.id,
    pharmaId
  )

  res.send()
}
