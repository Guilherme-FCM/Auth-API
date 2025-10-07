require('dotenv').config()
const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.json())

// Cookie Based Authentication Config
const cookieParser = require('cookie-parser');
app.use(cookieParser())

const session = require('express-session');
const authConfig = require('./config/auth')
app.use(session({
  name: 'Auth-API',
  secret: authConfig.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60
  }
}))

app.use(routes)

const PORT = process.env.API_PORT || 3000
app.listen(PORT, () => { console.log(`Server started at port ${PORT}.`) })