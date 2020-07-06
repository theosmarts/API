import {
  isExpectedObject,
  isEmail,
  isEmpty,
  isPhoneNumber,
} from "../../utils/GlobalValidation";
import db from "../../database/models/index";

class Company {
  // validate company user input
  static validateData(req, res, next) {
    let expectedObject = [
      "name",
      "regNumber",
      "postalAddress",
      "physicalAddress",
      "mobileAddress",
      "emailAddress",
      "displayName",
      "twoFactorAuthentication",
      "databaseName",
    ];

    let requiredData = [
      "name",
      "regNumber",
      "physicalAddress",
      "mobileAddress",
      "emailAddress",
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
        message: "The mobile address is invalid",
      });
    } else {
      next();
    }
  }

  // validate unique constrain
  static async uniqueValues(req, res, next) {
    const email = await db.Company.findOne({
      where: { emailAddress: req.body.emailAddress },
    });
    const phone = await db.Company.findOne({
      where: { mobileAddress: req.body.mobileAddress },
    });
    const regNumber = await db.Company.findOne({
      where: { regNumber: req.body.regNumber },
    });
    if (phone) {
      res.status(405).send({
        status: "error",
        message: "Mobile address already exist",
      });
    } else if (email) {
      res.status(405).send({
        status: "error",
        message: "Company email address already exist",
      });
    } else if (regNumber) {
      res.status(405).send({
        status: "error",
        message: "Registration number already exist",
      });
    } else {
      next();
    }
  }

  // add company to database
  static async addCompany(req, res) {
    try {
      const company = await db.Company.create({
        ...req.body,
      });
      res.status(200).send({
        status: "success",
        message: "Company added successfully",
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "We are sorry an error occured",
        error,
      });
    }
  }

  static viewCompanies = async (req, res) => {
    try {
      const companies = await db.Company.findAll();

      res.status(200).send({
        companies,
      });
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  };

  static getOneCompany = async (req, res) => {
    const { companyId } = req.params;
    try {
      const company = await db.Company.findOne({ where: { id: companyId } });
      if (company) {
        res.status(200).send({
          company,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "Company not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error,
      });
    }
  };

  // deactivate a company
  static deActivate = async (req, res) => {
    const { companyId } = req.params;
    try {
      const company = await db.Company.findOne({ where: { id: companyId } });

      if (company) {
        const isActive = company.isActive;
        if (isActive) {
          db.Company.update({ isActive: false }, { where: { id: companyId } });
        }
        if (!isActive) {
          db.Company.update({ isActive: true }, { where: { id: companyId } });
        }

        res.status(200).send({
          status: "success",
          message: `Company  has been ${
            !isActive ? "activated" : "deactivated"
          }`,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "Company Id number does not exist",
        });
      }
    } catch (error) {
      console.log(companyId, error);
      res.status(500).send({ error: error });
    }
  };

  //edit company
  static editCompany = async (req, res) => {
    const { companyId } = req.params;
    try {
      const company = await db.Company.update(
        {
          ...req.body,
        },
        { where: { id: companyId } }
      );

      res.status(200).send({
        status: "success",
        message: "company edited"
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "We are sorry an error occured",
        error,
      });
    }
  };
}

export default Company;
