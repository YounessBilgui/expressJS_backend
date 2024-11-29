import { dir } from 'console'
import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddlewware.js'

const app = express()

const PORT = process.env.PORT || 5003

 // GET THE FILE PATH FROM THE URL OF THE CURRENT MODULE 
const __filename = fileURLToPath(import.meta.url)

// GET THE DIRECTORY NAME FROM THE FILE PATH 

const __dirname = dirname(__filename)

// MIDDLEWARE 

app.use(express.json())


// PATHS
app.use(express.static(path.join(__dirname, '../public')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
    // console.log("hello wor;d")
    // return 'test'
})

// routes

app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)



app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
})
