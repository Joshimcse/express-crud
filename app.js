const express = require("express");
const mongoose = require("mongoose");

// set up express app
const app = express();

// listen for request
const port = process.env.PORT || 6300;
app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);

  // Load DB
  const db = require("./config/keys").mongoURI;

  // MongoDB configuration
  mongoose.connect(
    db,
    { useNewUrlParser: true },
    (err, res) => {
      if (err) console.error(err);
      else console.log("Connected to Database");
    }
  );
});

//Testing Routes
app.get("/", (req, res) => {
  res.status(200).json({ msg: "routes work successfully" });
});
