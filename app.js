const express = require('express')
const books = require('./data/books.json')
const Joi = require('joi');


// Init app
const app = express()
app.use(express.json())

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

app.post('/books/create', (req, res) => {
    // console.log(req.body)
    // const title = req.body.title
    // const author = req.body.author
    // const description = req.body.description
    // const price = req.body.price
    // const cover = req.body.cover

    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30).required(),
        author: Joi.string().trim().min(3).max(30).required(),
        description: Joi.string().trim().min(3).max(300),
        price: Joi.number().min(0).required(),
        cover: Joi.string().trim().min(3).max(30).required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        console.log(error)
        res.status(400).json({ message: error.message })

    } else {
        res.status(201).json({ message: 'created successfull' })

    }

})

// Running the server
const PORT = 8000
app.listen(PORT, () => {
    console.log(`WELCOME TO PORT ${PORT}`)
})