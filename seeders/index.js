const connectDB = require('../config/connect');
const { seedUsers, removeUsers } = require("./users/userSeeders");
const { seedAuthors, removeAuthors } = require("./authors/authorSeeders");
const { seedBooks, removeBooks } = require("./books/bookSeeders");
require("dotenv").config();

// Connect to DB
connectDB();

const run = async () => {
    try {
        const argv = process.argv[2];
        const shouldRemove = argv !== '-all';

        if (shouldRemove) {
            await Promise.all([removeUsers(), removeBooks(), removeAuthors()]);
        }

        switch (argv) {
            case '+all':
                await Promise.all([seedUsers(), seedAuthors(), seedBooks()]);
                break;
            case '-all':
                await Promise.all([removeUsers(), removeBooks(), removeAuthors()]);
                break;
            case '+users':
                await seedUsers();
                break;
            case '-users':
                await removeUsers();
                break;
            case '+authors':
                await seedAuthors();
                break;
            case '-authors':
                await removeAuthors();
                break;
            case '+books':
                await seedBooks();
                break;
            case '-books':
                await removeBooks();
                break;
            default:
                console.log('Command not found. Use +all, -all, +users, -users, +authors, -authors, +books, or -books.');
                break;
        }

        // Exit the process successfully
        process.exit(0);
    } catch (error) {
        console.error('An error occurred:', error);
        // Exit the process with an error code
        process.exit(1);
    }
};

// Run the function
run();
