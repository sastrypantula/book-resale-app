const mongoose = require('mongoose');

async function main() {
    console.log("database is connecting..");
    await mongoose.connect(process.env.DB_CONNECT_STRING);
    console.log("Database connected successfully!");
}

module.exports = main;


