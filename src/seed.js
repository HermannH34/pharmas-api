import { db } from './database.js'
import { faker } from '@faker-js/faker';

db.prepare("DELETE FROM pharmacies").run()
db.prepare("DELETE FROM laboratories").run()

// create pharmas
let city = ["Glasgow", "London", "Manchester", "Plymouth"];

for (let i = 0; i < 25; i++) {
  db.prepare("INSERT INTO pharmacies (name, city) VALUES (?, ?)").run(
    faker.company.name(), city[Math.floor(Math.random() * city.length)]
  )
}

console.log("Pharmacies created !")

// create labo
const labs = ["Servier", "J&J", "Pfizer"]

for (let i = 0; i < labs.length; i++) {
  db.prepare("INSERT INTO laboratories (name) VALUES (?)").run(
    labs[i]
  )
}

console.log("Laboratories created !")
