import authenticate from "./authenticate";
import UserValidator from "./UserValidator";
import RoleValidator from "./RoleValidator";

const middleware = {
  authenticate,
  UserValidator,
  RoleValidator,
};

export default middleware;
