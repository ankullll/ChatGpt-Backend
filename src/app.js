const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();

// importing routes
const authRoutes = require('./routes/auth.routes')
const chatRoutes = require('../src/routes/chat.routes')

// using middlewares
app.use(express.json())
app.use(cookieParser())


// using routes
app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)



module.exports = app;