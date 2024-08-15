const express = require('express')
const books = require('./data/books.json')
// Init app
const app = express()

app.get('/home', (req, res) => {
    res.json(books)
})

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ message: 'book not found' })
    }
})


// Running the server
const PORT = 8000
app.listen(PORT, () => {
    console.log(`WELCOME TO PORT ${PORT}`)
})