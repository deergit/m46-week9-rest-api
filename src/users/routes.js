const { Router } = require("express");
const userRouter = Router();

const { registerUser, getAllUsers, getUserByName, loginUser, updateUser, deleteUser, deleteAllUsers } = require("./controllers");
const { hashPass, checkPass } = require("../middleware");

userRouter.post("/users/register", hashPass, registerUser);

userRouter.get("/users/getallusers", getAllUsers);

userRouter.get("/users/getuser/:username", getUserByName);

userRouter.get("/users/login", checkPass, loginUser);

userRouter.put("/users/updateuser/:username", updateUser);

userRouter.delete("/users/deleteuser/:username", deleteUser);

userRouter.delete("/users/deleteallusers", deleteAllUsers);

module.exports = userRouter;