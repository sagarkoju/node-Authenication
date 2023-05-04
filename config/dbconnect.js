const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/digitic", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(" Database Error");
  }
};
module.exports = dbConnect;
