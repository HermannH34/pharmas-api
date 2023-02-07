import { db } from './database.js'
import { faker } from '@faker-js/faker';

db.prepare("DELETE FROM products").run()
db.prepare("DELETE FROM pharmacies").run()
db.prepare("DELETE FROM laboratories").run()


// create pharmas
let cities = ["Glasgow", "London", "Manchester", "Plymouth"];

for (const city of cities) {
  db.prepare("INSERT INTO pharmacies (name, city) VALUES (?, ?)").run(
    faker.company.name(), city[Math.floor(Math.random() * city.length)]
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

// create products
const products = ["Doliprane", "Smecta", "Efferalgan", "Xanax", "Lexomil", "Dafalgan"]

for (let i = 0; i < 50; i++) {
  const ids = db.prepare("SELECT id FROM laboratories").all()

  const rangeOfId = ids.map(id => id.id)

  const labId = db.prepare("SELECT id FROM laboratories WHERE id = ?").get(rangeOfId[Math.floor(Math.random() * rangeOfId.length)])

  // créer un procuct et lui affecter un labo
  db.prepare("INSERT INTO products (name, laboratoryid) VALUES (?, ?)").run(
    products[Math.floor(Math.random() * products.length)],
    labId.id
  )
}

console.log("Products created !")
