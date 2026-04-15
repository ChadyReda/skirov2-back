import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'
import fs from 'fs'
import { config } from '../src/config'
import routes from '../src/routes'
import { errorHandler } from '../src/middleware/errorHandler'
import { prisma } from '../src/utils/prisma'

const app = express()

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
)

const allowedOrigins = [
  "https://website-frontend-skiro.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "https://www.skirostore.com",
  "https://skirostore.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan(config.isDev ? 'dev' : 'combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Static files (uploads) - skip directory creation logic on Vercel (read-only)
if (!process.env.VERCEL) {
  const uploadPath = path.join(process.cwd(), config.uploadDir)
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }
}
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), config.uploadDir), { maxAge: '7d' })
)

// Main Routes
app.use('/api', routes)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error handler
app.use(errorHandler)

// Vercel Serverless Logic
let isConnected = false
const connectDB = async () => {
  if (!isConnected) {
    try {
      await prisma.$connect()
      isConnected = true
      console.log('✅ Prisma connected')
    } catch (err) {
      console.error('❌ Database connection failed:', err)
    }
  }
}

// Entry point for local development
if (!process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(config.port, () => {
      console.log(`\n🚀 Skiro API running on http://localhost:${config.port}\n`)
    })
  })
}

// Export for Vercel
export default async (req: any, res: any) => {
  await connectDB()
  return app(req, res)
}
