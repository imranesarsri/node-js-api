const { string } = require('joi');
const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 30,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 30,
    },
    nationality: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 30,
    },
    age: {
        type: Number,
        require: true,
        trim: true,
        minlenght: 16,
        maxlight: 99,
    },
    image: {
        type: String,
        trim: true,
        default: "default-image.png",
    }
}, {
    timestamps: true
})

const Author = mongoose.model('Author', AuthorSchema)

module.exports = {
    Author
}
