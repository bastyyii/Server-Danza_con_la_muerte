const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});


//Conexion
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {});
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;