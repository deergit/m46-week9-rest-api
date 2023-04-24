const bcrypt = require("bcrypt");

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

    const match = await bcrypt.compare(req.body.password, req.user.password);

    if (!match) {
      const error = new Error("Passwords do not match");
      res.status(500).json({
        errorMessage: error.message,
        error: error
      });
    } else { next() }
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

module.exports = {
  hashPass,
  checkPass
}