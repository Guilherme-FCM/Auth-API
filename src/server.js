const express = require('express')

const app = express()

app.get('/', (request, response) => response.json({ 
    message: 'Server in work!' 
}))

app.listen(3333, () => { console.log('Server started.') })