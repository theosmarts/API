import {
  isExpectedObject,
  isEmail,
  isEmpty,
  isPhoneNumber,
} from "../../utils/GlobalValidation";
import db, { sequelize } from "../../database/models/index";
const { QueryTypes } = require("sequelize");

class Branch {
  static validateData(req, res, next) {
    let expectedObject = [
      "name",
      "code",
      "location",
      "payBillNumber",
      "isHeadOffice",
    ];

    let requiredData = ["name", "location"];

    if (isExpectedObject(req.body, expectedObject)) {
      res.status(405).send(isExpectedObject(req.body, expectedObject));
    } else if (isEmpty(req.body, requiredData)) {
      res.status(405).send(isEmpty(req.body, requiredData));
    } else {
      next();
    }
  }

  static async validateUniqueFields(req, res, next) {
    try {
      const { name } = req.body;
      const branchName = await db.Branch.findOne({ where: { name } });
      if (branchName) {
        res.status(401).send({
          status: "error",
          message: "Branch name already exists",
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  static async validateCompanyId(req, res, next) {
    const {
      params: { companyId },
    } = req;
    try {
      const company = await db.Company.findOne({ where: { id: companyId } });
      if (!company) {
        res.status(404).send({
          status: "error",
          message: "Company Id is invalid",
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  static async validateBranchId(req, res, next) {
    const {
      params: { branchId },
    } = req;
    try {
      const branch = await db.Branch.findOne({ where: { id: branchId } });
      if (!branch) {
        res.status(404).send({
          status: "error",
          message: "Branch Id is invalid",
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  static async validateIsHeadOffice(req, res, next) {
    const {
      params: { companyId },
    } = req;
    try {
      if (req.body.isHeadOffice) {
        const headOffice = await db.Branch.findAll({
          where: { companyId, isHeadOffice: true },
        });
        console.log(headOffice);
        if (headOffice.length > 0) {
          res.status(401).send({
            status: "error",
            message: "Head office Branch already exists",
          });
        } else {
          next();
        }
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  static async addBranch(req, res) {
    const {
      params: { companyId },
    } = req;
    try {
      const company = await db.Company.findOne({ where: { id: companyId } });
      const branch = await db.Branch.create({
        ...req.body,
        companyId,
      });
      console.log(branch.isHeadOffice, req.body.isHeadOffice);
      res.status(200).send({
        status: "success",
        branch,
        company,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error,
      });
    }
  }

  static async getAllBranches(req, res, next) {
    try {
      const branches = await db.Branch.findAll();
      const response = await Promise.all(
        branches.map(async (branch) => {
          const [
            companyName,
          ] = await sequelize.query(
            `select name from Companies where id='${branch.CompanyId}'`,
            { type: QueryTypes.SELECT }
          );
          const data = {
            id: branch.id,
            name: branch.name,
            code: branch.code,
            location: branch.location,
            payBillNumber: branch.payBillNumber,
            isHeadOffice: branch.isHeadOffice,
            companyId: branch.CompanyId,
            isActive: branch.isActive,
            companyName: companyName.name,
            createdBy: branch.createdBy,
            modifiedBy: branch.ModifiedBy,
            createdAt: branch.createdAt,
            updatedAt: branch.updatedAt,
          };
          return data;
        })
      );
      res.status(200).send({
        branches: response,
      });
    } catch (error) {
        console.log(error)
      res.status(500).send({ error });
    }
  }

  static async getCompanyBranches(req, res, next) {
    const {
      params: { companyId },
    } = req;
    try {
      const branches = await db.Branch.findAll({ where: { companyId } });
      res.status(200).send({
        branches,
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  static async updateBranches(req, res, next) {
    const {
      params: { branchId },
    } = req;
    try {
      let requiredData = ["companyId"];
      if (!req.body.companyId) {
        res.status(401).send({
          status: "error",
          message: "Company Id is missing",
        });
      }
      const company = await db.Company.findOne({
        where: { id: req.body.companyId },
      });

      if (isEmpty(req.body, requiredData)) {
        res.status(405).send(isEmpty(req.body, requiredData));
      } else if (!company) {
        res.status(401).send({
          status: "error",
          message: "company ID is invalid",
        });
      } else {
        const branches = await db.Branch.update(
          { ...req.body },
          { where: { id: branchId } }
        );
        res.status(200).send({
          branches,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  static async getOneBranch(req, res, next) {
    try {
      const {
        params: { branchId },
      } = req;
      const branch = await db.Branch.findOne({ where: { id: branchId } });
      if (branch) {
        res.status(200).send({
          branch,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "branch not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
  static async deactivate(req, res, next) {
    try {
      const {
        params: { branchId },
      } = req;
      const branch = await db.Branch.findOne({ where: { id: branchId } });
      if (branch) {
        const isActive = branch.isActive;
        if (isActive) {
          db.Branch.update({ isActive: false }, { where: { id: branchId } });
        }
        if (!isActive) {
          db.Branch.update({ isActive: true }, { where: { id: branchId } });
        }

        res.status(200).send({
          status: "success",
          message: `Branch  has been ${
            !isActive ? "activated" : "deactivated"
          }`,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "Branch Id number does not exist",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
}

export default Branch;
