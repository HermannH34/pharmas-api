import { db } from './database.js'
import { faker } from '@faker-js/faker';

db.prepare("DELETE FROM orders").run()
db.prepare("DELETE FROM products").run()
db.prepare("DELETE FROM pharmacies").run()
db.prepare("DELETE FROM laboratories").run()

function hasard(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

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

// create products
const products = ["Doliprane", "Smecta", "Efferalgan", "Xanax", "Lexomil", "Dafalgan"]

for (let i = 0; i < 50; i++) {
  db.prepare("INSERT INTO products (name, laboratoryid) VALUES (?, (SELECT id FROM laboratories ORDER BY RANDOM() LIMIT 1))").run(
    hasard(products)
  )
}

console.log("Products created !")
