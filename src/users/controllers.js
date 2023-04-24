const User = require("./model");

const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      message: "Success",
      newUser: {
        username: newUser.username,
        email: newUser.email,
        password: "hidden"
      }
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

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOne({ where: { username: req.params.username } });

    updatedUser.username = req.body.username ?? updatedUser.username;
    updatedUser.email = req.body.email ?? updatedUser.email;
    updatedUser.password = req.body.password ?? updatedUser.password;

    await updatedUser.save();

    res.status(201).json({
      message: "Success",
      updatedUser: {
        username: updatedUser.username,
        email: updatedUser.email,
        password: "hidden"
      }
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
  updateUser,
  deleteUser,
  deleteAllUsers
}