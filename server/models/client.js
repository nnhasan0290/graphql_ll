const mongoose = require("mongoose");

const Client = mongoose.model(
  "Client",
  mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  })
);

module.exports = Client
