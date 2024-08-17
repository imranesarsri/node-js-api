const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose
            .connect('mongodb://127.0.0.1/bookStore')
        console.log('CONNECTED TO DATABASE IS SECCESSFULL...');
    } catch (error) {
        console.error(`ERROR TRYING CONNECT TO DATABASE: ${error}`);
        process.exit(1); // Exit process with failure
    }
};


module.exports = connectDB;