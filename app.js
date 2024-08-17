const express = require('express')
const routerBooks = require('./router/books')
const routerAuthors = require('./router/authors')


// Init app
const app = express()

// Apply Middlewres
app.use(express.json())

// Routers
app.use('/books', routerBooks)
app.use('/authors', routerAuthors)


// Running the server
const PORT = 8000
app.listen(PORT, () => {
    console.log(`WELCOME TO PORT ${PORT}`)
})