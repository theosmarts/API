import express from "express";
import Role from "./roles";
import middleware from "../../middlewares";

const { RoleValidator } = middleware;
const rolesRouter = express.Router();

rolesRouter.post(
  "/role",
  RoleValidator.validateData,
  RoleValidator.uniqueValues,
  Role.addRole
);

rolesRouter.get("/role", Role.viewAllRoles);

rolesRouter.get("/role/:roleId", Role.viewOneRole);

rolesRouter.get("/user/role/:email", Role.getRoleId);

rolesRouter.put(
  "/role/:roleId",
  RoleValidator.validateData,
  RoleValidator.uniqueValues,
  Role.updateOneRole
);

export default rolesRouter;
