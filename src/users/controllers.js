const User = require("./model");

const registerUser = async (req, res) => {
  console.log("reached controller")
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      message: "Success",
      newUser: newUser
    });
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const userList = await User.findAll();

    res.status(200).json({
      message: "Success",
      items: userList
    });
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const getUserByName = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });

    res.status(200).json({
      message: "Success",
      user: user
    });
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const loginUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "Login success!",
      user: {
        username: req.user.username,
        email: req.user.email
      }
    });
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.update(
      { [req.body.key]: req.body.value },
      { where: { username: req.params.username } }
    );

    res.status(201).json({
      message: "Success",
      updatedUser: updatedUser
    });
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({ where: { username: req.params.username } });

    res.status(201).json({
      message: "Successfully deleted",
      result: deletedUser
    });
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

const deleteAllUsers = async (req, res) => {
  try {
    const deletedUsers = await User.destroy({ truncate: true });

    res.status(202).json({
      message: "Successfully deleted all users",
      result: deletedUsers
    });
  } catch (error) {
    res.status(501).json({
      errorMessage: error.message,
      error: error
    });
  }
}

module.exports = {
  registerUser,
  getAllUsers,
  getUserByName,
  loginUser,
  updateUser,
  deleteUser,
  deleteAllUsers
}