import {
  isExpectedObject,
  isEmail,
  isEmpty,
  isPhoneNumber,
} from "../utils/GlobalValidation";
import db from "../database/models/index";

class UserValidator {
  /**
   * Validate data
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static async validateUserData(req, res, next) {
    let expectedObject = [
      "firstName",
      "lastName",
      "emailAddress",
      "payrollNumber",
      "roleIds",
      "mobileAddress",
      "companyIds",
      "branchIds",
    ];

    let requiredData = [
      "firstName",
      "lastName",
      "roleIds",
      "emailAddress",
      "mobileAddress",
      "payrollNumber",
    ];
    if (isExpectedObject(req.body, expectedObject)) {
      res.status(405).send(isExpectedObject(req.body, expectedObject));
    } else if (isEmpty(req.body, requiredData)) {
      res.status(405).send(isEmpty(req.body, requiredData));
    } else if (isEmail(req.body.emailAddress)) {
      res.status(405).send(isEmail(req.body.emailAddress));
    } else if (!isPhoneNumber(req.body.mobileAddress)) {
      res.status(405).send({
        status: "error",
        message: "the mobile address is invalid",
      });
    } else {
      next();
    }
  }

  static async uniqueValues(req, res, next) {
    try {
      const { emailAddress, mobileAddress } = req.body;
      const email = await db.User.findOne({ where: { emailAddress } });
      const mobile = await db.User.findOne({ where: { mobileAddress } });
      if (email) {
        res.status(401).send({
          status: "error",
          message: "Email address already exists",
        });
      } else if (mobile) {
        res.status(401).send({
          status: "error",
          message: "mobile address already exists",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error,
      });
    }
  }

  static async validateUserId(req, res, next) {
    const {
      params: { userId },
    } = req;
    try {
      const id = await db.User.findOne({ where: { id: userId } });
      if (!id) {
        res.status(401).send({
          status: "error",
          message: "Invalid user Id",
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}

export default UserValidator;
