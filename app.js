const express = require('express')
const connectDB = require('./config/connect')
require('dotenv').config()

const logger = require('./middlewares/logger')


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

// View engine
app.set("view engine", 'ejs')


// Routers
app.use('/books', require('./router/books'))
app.use('/authors', require('./router/authors'))
app.use('/auth', require('./router/auth'))
app.use('/users', require('./router/users'))
app.use('/forgotPassword', require('./router/forgotPassword'))