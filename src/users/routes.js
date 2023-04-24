const { Router } = require("express");
const userRouter = Router();

const { registerUser, getAllUsers, getUserByName, updateUser, deleteUser, deleteAllUsers } = require("./controllers");

userRouter.post("/users/register", registerUser);

userRouter.get("/users/getallusers", getAllUsers);

userRouter.get("/users/getuser/:username", getUserByName);

userRouter.put("/users/updateuser/:username", updateUser);

userRouter.delete("/users/deleteuser/:username", deleteUser);

userRouter.delete("/users/deleteallusers", deleteAllUsers);

module.exports = userRouter;