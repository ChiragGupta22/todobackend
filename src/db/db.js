const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("DB Connected ✅"))
      .catch((err) => console.log("DB Error ❌", err));
  } catch (err) {
    console.log("error to have Your fetched data", err);
    process.exit(1);
  }
};

module.exports = connectDB;
