const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
let sessionStore

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING)
    sessionStore = await MongoStore.create({
      client : mongoose.connection.getClient(),
      mongoUrl: process.env.DB_STRING,
    });
  
    console.log(`MongoDB Connected!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { connectDB, sessionStore };