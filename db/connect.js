const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URL)
        console.log('CONNECTED TO DATABASE IS SECCESSFULL...');
    } catch (error) {
        console.error(`ERROR TRYING CONNECT TO DATABASE: ${error}`);
        process.exit(1); // Exit process with failure
    }
};


module.exports = connectDB;