import db, { sequelize } from "../../database/models/index";

class User {
  static async addUser(req, res, next) {
    const {
      firstName,
      lastName,
      emailAddress,
      mobileAddress,
      payrollNumber,
      roleIds,
      companyIds,
      branchIds,
    } = req.body;

    try {
      const user = await db.User.create({
        firstName,
        lastName,
        emailAddress,
        mobileAddress,
        payrollNumber,
      });
      if (user) {
        const userRoleArray = await roleIds.map((role) => {
          const userBranchObj = {
            userId: user.id,
            roleId: role,
          };
          return userBranchObj;
        });
        const userBranchArray = await branchIds.map((item) => {
          const userBranchObj = {
            userId: user.id,
            branchId: item,
            defaultBranch: item,
          };
          return userBranchObj;
        });
        const userCompanyArray = await companyIds.map((item) => {
          const userCompanyObj = {
            userId: user.id,
            companyId: item,
            defaultCompany: item,
          };
          return userCompanyObj;
        });
        const userRole = await db.UserRole.bulkCreate(userRoleArray);
        const userBranch = await db.UserBranches.bulkCreate(userBranchArray);
        const userCompany = await db.UserCompanies.bulkCreate(userCompanyArray);
        res.status(200).send({
          status: "success",
          message: "New user has been created",
          user,
          userRole,
          userBranch,
          userCompany,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error,
      });
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const users = await db.User.findAll({ raw: true });
      res.status(200).send({
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  static async getOneUser(req, res, next) {
    const {
      params: { userId },
    } = req;
    try {
      const user = await sequelize.query(`EXEC getOneUser @userId='${userId}'`);
      res.status(200).send({
        user: user[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  static async getUserName(req, res, next) {
    const {
      params: { email },
    } = req;

    try {
      const userData = await db.User.findOne({
        where: { emailAddress: email },
      });
      if (!userData) {
        res.status(200).send({
          success: false,
          message: `User with email ${email} does not exist`,
        });
      }
      res.status(200).send({
        userData: userData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  static async getPayrollNo(req, res, next) {
    const {
      params: { email },
    } = req;

    try {
      const user = await sequelize.query(
        `SELECT payrollNumber FROM Users WHERE emailAddress='${email}'`
      );
      res.status(200).send({
        payrollNumber: user[0][0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  static async deactivateUser(req, res, next) {
    const {
      params: { userId },
    } = req;
    try {
      const user = await sequelize.query(`EXEC getOneUser @userId='${userId}'`);

      if (user[0].length > 0) {
        if (user[0][0].isLockedOut) {
          const update = await db.User.update(
            { isLockedOut: false },
            { where: { id: userId } }
          );
          res.status(200).send({
            status: "success",
            message: "user is not active",
          });
        } else {
          const update = await db.User.update(
            { isLockedOut: true },
            { where: { id: userId } }
          );
          res.status(200).send({
            status: "success",
            message: "user is active",
          });
        }
      } else {
        res.status(404).send({
          status: "error",
          message: "User does not exist",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
}

export default User;
