const { Book } = require('../../Models/Book')
const booksData = require("./booksData")

const { Author } = require('../../Models/Author')
const { seedAuthors } = require('../authors/authorSeeders')



const seedBooks = async () => {
    try {
        // Seed authors first
        await seedAuthors();

        // Retrieve all author IDs
        const authors = await Author.find().select('_id');

        // Assign a random author ID to each book
        const booksWithAuthors = booksData.map((book) => {
            const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
            book.author = randomAuthor._id;
            return book;
        });

        // Insert books with assigned author IDs
        await Book.insertMany(booksWithAuthors);
        console.log('Books Imported');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};


const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log("Books Removed!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = {
    seedBooks,
    removeBooks
}
