import { db } from '../database.js'
import { hasard } from '../hasard.js'

export const order = (req, res) => {
  const pharmaId = req.params.id;
  const query = req.query;
  const productQuery = query.product;
  const laboratoryQuery = query.laboratory;
  const quantity = query.quantity
  // // trouver le produit commandé par la pharma
  // let product = db.prepare('SELECT * FROM products WHERE name = ? AND laboratoryid = (SELECT id FROM laboratories WHERE name = ?) ORDER BY RAND() LIMIT 1').all(
  //   productQuery, laboratoryQuery
  // )
  // insérer ce produit dans orders
  db.prepare('INSERT INTO orders (quantity, productid, pharmacyid) VALUES (?, (SELECT id FROM products WHERE name = ? AND laboratoryid = (SELECT id FROM laboratories WHERE name = ?)), ?)').run(
    quantity,
    productQuery,
    laboratoryQuery,
    pharmaId
  )

  res.send()
}
