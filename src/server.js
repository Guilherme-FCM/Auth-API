require('dotenv').config()
const PORT = process.env.API_PORT || 3000
const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use(routes)

app.listen(PORT, () => { console.log(`Server started at port ${PORT}.`) })