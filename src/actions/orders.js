import { db } from '../database.js'

export const order = (req, res) => {
  // vérifier si user est une pharma
  if (req.user.ispharmacy !== "true") return res.status(401).send('user must be a pharmacian')

  const pharmaId = db.prepare('SELECT id FROM pharmacies WHERE userid = ?').all(
    req.user.id
  )[0].id


  let { product, quantity, laboratory } = req.body;

  // Cas d'erreurs

  if (!quantity || !product || !laboratory) return res.status(400).json({ error: 'details about order are required' })

  if (typeof quantity !== 'number') {
    quantity = parseFloat(quantity);
    if (isNaN(quantity)) {
      return res.status(400).send('quantity must be a number');
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
  res.json(`DataReceived: ${quantity} ${product} from ${laboratory}`)
}
