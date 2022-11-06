import express from 'express'
import router from './routes'
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(process.env.HOST_PORT, ()=> console.log(`Listening ${process.env.HOST_PORT}`))


