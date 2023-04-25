const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    next();
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const checkPass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ where: { username: req.body.username } });

    if (!req.user) { throw new Error("Password or username does not match") }

    const match = await bcrypt.compare(req.body.password, req.user.password);

    if (!match) { throw new Error("Password or username does not match") }

    next();
  } catch (error) {
    res.status(401).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const checkEmail = async (req, res, next) => {
  try {
    if (String(req.body.email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        next();
    } else {
      res.status(400).json({
        errorMessage: "invalid email"
      });
    }
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const checkToken = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) { throw new Error("No header or token found") }

    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const dcToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(dcToken);
    next();
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

module.exports = {
  hashPass,
  checkPass,
  checkEmail,
  checkToken
}