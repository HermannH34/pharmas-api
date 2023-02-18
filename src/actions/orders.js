import { db } from '../database.js'

export const order = (req, res) => {
  // vérifier si user est une pharma
  console.log(req.user)
  if (req.user.labo) return res.status(401).send('invalid credentials')

  const pharmaId = req.params.id;
  let { product, quantity, laboratory } = req.body;

  // Cas d'erreurs

  if (!quantity || !product || !laboratory) {
    res.status(400).json({ error: 'details about order are required' })
  }

  if (typeof quantity !== 'number') {
    quantity = parseFloat(quantity);
    if (isNaN(quantity)) {
      return res.status(400).json({ error: 'quantity must be a number' });
    }
  }

  if (db.prepare('SELECT name FROM laboratories WHERE name = ?').all(laboratory).length == 0) return res.status(404).send({ error: 'Laboratory must exist' });

  // ------------------------------------------------------

  db.prepare('INSERT INTO orders (quantity, productid, pharmacyid) VALUES (?, (SELECT id FROM products WHERE name = ? AND laboratoryid = (SELECT id FROM laboratories WHERE name = ?)), ?)').run(
    quantity,
    product,
    laboratory,
    pharmaId
  )
  res.status(201)
  res.json({ DataReceived: ` ${quantity} ${product} from ${laboratory}` });
}
