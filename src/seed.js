import { db } from './database.js'
import { faker } from '@faker-js/faker';
import { hasard } from './hasard.js'

db.prepare("DELETE FROM orders").run()
db.prepare("DELETE FROM products").run()
// db.prepare("DELETE FROM stocks").run()
db.prepare("DELETE FROM pharmacies").run()
db.prepare("DELETE FROM laboratories").run()


// create pharmas
let cities = ["Glasgow", "London", "Manchester", "Plymouth"];

for (let i = 0; i < 30; i++) {
  db.prepare("INSERT INTO pharmacies (name, city) VALUES (?, ?)").run(
    faker.company.name(), hasard(cities)
  )
}

console.log("Pharmacies created !")

// create labo
const labs = ["Servier", "J&J", "Pfizer"]

for (const lab of labs) {
  db.prepare("INSERT INTO laboratories (name) VALUES (?)").run(
    lab
  )
}

console.log("Laboratories created !")

// create products & stocks
const products = ["Doliprane", "Smecta", "Efferalgan", "Xanax", "Lexomil", "Dafalgan"]

for (let i = 0; i < 50; i++) {
  const ids = db.prepare("SELECT id FROM laboratories").all()

  const rangeOfId = ids.map(id => id.id)

  const labId = db.prepare("SELECT id FROM laboratories WHERE id = ?").get(hasard(rangeOfId))

  let hasardChoice = hasard(products);
  // créer un product et lui affecter un labo
  db.prepare("INSERT INTO products (name, instock, laboratoryid) VALUES (?, true, ?)").run(
    hasardChoice,
    labId.id
  )

  // db.prepare("INSERT INTO stocks (name, laboratoryid) VALUES (?, ?)").run(
  //   hasardChoice,
  //   labId.id
  // )
}

console.log("Products created !")
