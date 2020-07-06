import db from "../../database/models/index";
import CustomError from "../../utils/error";

class Enumeration {
  static async getEnumerations(req, res, next) {
    try {
      const enumerations = await db.Enumeration.findAll();
      res.status(200).send({
        enumerations
      });
    } catch (error) {
      CustomError.handleError(error, 500, res);
    }
  }
}

export default Enumeration;
