import app from './app.js'

const host = '0.0.0.0';

const start = async () => {
  try {
    await app.listen(process.env.PORT || 8000, host)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
