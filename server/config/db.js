const mongoose = require("mongoose");

 const connectDatabase = () => {
   mongoose
    .connect(process.env.DB)
    .then(() => console.log("Database connected successfully"))
    .catch(() => console.log("there's a error in connecting database"));
};

module.exports = connectDatabase;
