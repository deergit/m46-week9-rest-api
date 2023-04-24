const { Router } = require("express");
const userRouter = Router();

const { addUser, getAllUsers, getUserByName, updateUser, deleteUser, deleteAllUsers } = require("./controllers");

userRouter.post("/users/adduser", addUser);

userRouter.get("/users/getallusers", getAllUsers);

userRouter.get("/users/getuser/:username", getUserByName);

userRouter.put("/users/updateuser/:username", updateUser);

userRouter.delete("/users/deleteuser/:username", deleteUser);

userRouter.delete("/users/deleteallusers", deleteAllUsers);

module.exports = userRouter;