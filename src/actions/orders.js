import { db } from '../database.js'
import { hasard } from '../hasard.js'

export const order = (req, res) => {
  // récupérer les params de la query
  const pharmaId = req.params.id;
  const query = req.query;
  const productQuery = query.product;
  const laboratoryQuery = query.laboratory;
  // trouver l'id du labo
  const laboratoryId = db.prepare('SELECT id FROM laboratories WHERE name = ?').all(
    laboratoryQuery
  )[0].id
  // sélectionner un produit du labo en question au hasard
  let product = db.prepare('SELECT * FROM products WHERE name = ? AND laboratoryid = ?').all(
    productQuery, laboratoryId
  )

  product = hasard(product)
  console.log(product.id)
  // insérer ce produit dans orders
  db.prepare('INSERT INTO orders (title, productid, pharmacyid) VALUES (?, ?, ?)').run(
    query.title,
    product.id,
    pharmaId
  )
  // indiquer que le product n'est plus en stock
  db.prepare('UPDATE products SET instock = false WHERE name = ? AND laboratoryid = ? AND instock = true LIMIT 1').run(
    product.name, laboratoryId
  )

  res.send()
}
