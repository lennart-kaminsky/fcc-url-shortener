const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const router = require("./routes/router");
app.use(router);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});