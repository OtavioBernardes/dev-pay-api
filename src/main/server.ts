import express from 'express'
import * as dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())

app.listen(process.env.HOST_PORT, ()=> console.log(`Listening ${process.env.HOST_PORT}`))