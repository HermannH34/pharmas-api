import { db } from '../database.js'
import { faker } from '@faker-js/faker';

export const listLabs = (req, res) => {
  const labs = db.prepare('SELECT * FROM laboratories').all();

  res.send(faker.address.city())
}
