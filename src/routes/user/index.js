import express from "express";
import User from "./User";

import middleware from "../../middlewares";

const { UserValidator } = middleware;

const userRouter = express.Router();

userRouter.post(
  "/users",
  UserValidator.validateUserData,
  UserValidator.uniqueValues,
  User.addUser
);

userRouter.get("/users", User.getAllUser);

userRouter.get("/users/:userId", UserValidator.validateUserId, User.getOneUser);

userRouter.get("/user/payroll/:email", User.getPayrollNo);

userRouter.get("/users/username/:email", User.getUserName);

userRouter.put("/user/deactivate/:userId", User.deactivateUser);

export default userRouter;
