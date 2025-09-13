import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import { initDB } from './config/db.js'

dotenv.config()
const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}))
app.use(express.json())

await initDB()

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => res.json({ message: 'API running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
