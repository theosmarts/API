import { isExpectedObject, isEmpty } from "../utils/GlobalValidation";
import db from "../database/models/index";

class RoleValidator {
  static async validateData(req, res, next) {
    let expectedObject = ["name", "description"];

    let requiredData = ["name"];

    if (isExpectedObject(req.body, expectedObject)) {
      res.status(405).send(isExpectedObject(req.body, expectedObject));
    } else if (isEmpty(req.body, requiredData)) {
      res.status(405).send(isEmpty(req.body, requiredData));
    } else {
      next();
    }
  }

  static async uniqueValues(req, res, next) {
    try {
      const { name } = req.body;
      const roleName = await db.Role.findOne({ where: { name } });
      if (roleName) {
        res.status(405).send({
          status: "error",
          message: "Role name already exists",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
}

export default RoleValidator;
