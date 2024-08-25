const { Author } = require('../../Models/Author')
const authorsData = require("./authorsData")


const seedAuthors = async () => {
    try {
        await Author.insertMany(authorsData)
        console.log('Authors Imported')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


const removeAuthors = async () => {
    try {
        await Author.deleteMany();
        console.log("Authors Removed!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = {
    seedAuthors,
    removeAuthors
}
