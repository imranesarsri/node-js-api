const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 30,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Author"
    },
    description: {
        type: String,
        trim: true,
        minlenght: 3,
        maxlight: 300,
    },
    price: {
        type: Number,
        require: true,
        minlenght: 0,
    },
    cover: {
        type: String,
        require: true,
        enum: ["soft cover", "hard cover"],
    }
}, {
    timestamps: true
})

const Book = mongoose.model('Book', BookSchema)

module.exports = {
    Book
}
