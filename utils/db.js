const mongoose = require("mongoose");

const urlDb = "mongodb://localhost:27017/movies";

const connect = async () => {
  try {
    await mongoose.connect(urlDb, {
      usenewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected with db succesfully`);
  } catch (error) {
    console.error(`Error to connect with db: ${error}`);
  }
};

module.exports = { connect };
