const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://farooqafzal467:NtoHSYrUne9nqf8V@earn4views.xuu3cxn.mongodb.net/Earn4Views";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('connected to mongoose');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;
