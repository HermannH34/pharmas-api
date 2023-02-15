import { db } from '../database.js'

export const order = (req, res) => {
  const pharmaId = req.params.id;
  const body = req.body;

  db.prepare('INSERT INTO orders (quantity, productid, pharmacyid) VALUES (?, (SELECT id FROM products WHERE name = ? AND laboratoryid = (SELECT id FROM laboratories WHERE name = ?)), ?)').run(
    body.quantity,
    body.product,
    body.laboratory,
    pharmaId
  )
  res.code(201)
  res.send(`Data Received: product: ${body.product} quantity: ${body.quantity} laboratory: ${body.laboratory}`);
  req.body()
}
