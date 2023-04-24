require("dotenv").config();
const express = require("express");
const app = express();
const User = require("./users/model");
const userRouter = require("./users/routes");

const port = process.env.PORT || 5001;

app.use(express.json());

const syncTables = () => {
  // for later syncing of tables
  User.sync();
}

app.use(userRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "App running correctly" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server open on port ${port}`);
});