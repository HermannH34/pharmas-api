import { db } from '../database.js'

export const createPharma = (req, res) => {
  // verifier si user est un pharmacien
  console.log(req.user)
  // if (req.user || !req.user.ispharmacy) return res.status(401).send('invalid credentials')
}
