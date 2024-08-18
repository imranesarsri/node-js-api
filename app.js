const express = require('express')
const routerBooks = require('./router/books')
const routerAuthors = require('./router/authors')
const connectDB = require('./db/connect')
const dotenv = require('dotenv')
dotenv.config()


// Connected to database
connectDB().then(() => {
    // Running the server
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`SERVER is running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
    })
}).catch(error => {
    console.error(`Failed to connect to the database: ${error}`);
});



// Init app
const app = express()

// Apply Middlewres
app.use(express.json())

// Routers
app.use('/books', routerBooks)
app.use('/authors', routerAuthors)


