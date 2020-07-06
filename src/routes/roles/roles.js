import db from "../../database/models/index";

class Role {
  static async addRole(req, res) {
    try {
      const role = await db.Role.create(req.body);
      res.status(200).send({
        role,
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  static async viewAllRoles(req, res) {
    try {
      const roles = await db.Role.findAll();
      res.status(200).send({
        roles,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  static async viewOneRole(req, res) {
    try {
      const {
        params: { roleId },
      } = req;
      const role = await db.Role.findOne({ where: { id: roleId } });
      if (role) {
        res.status(200).send({
          role,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "Role not found",
        });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  static async getRoleId(req, res, next) {
    const {
      params: { email },
    } = req;

    try {
      const user = await db.User.findOne({ where: { emailAddress: email } });
      if (!user) {
        res.status(200).send({
          success: false,
          message: `User with email ${email} does not exist`,
        });
      } else {
        const {
          dataValues: { id: userId },
        } = user;
        const role = await db.UserRole.findOne({ where: { userId } });
        const {
          dataValues: { roleId },
        } = role;
        const roleName = await db.Role.findOne({ where: { id: roleId } });
        const {
          dataValues: { name },
        } = roleName;
        res.status(200).send({
          roleId,
          name,
          userId,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  static async updateOneRole(req, res) {
    const {
      params: { roleId },
    } = req;
    try {
      const updatedRole = await db.Role.update(
        { ...req.body },
        { where: { id: roleId } }
      );
      res.status(200).send({
        status: "success",
        message: "updated successfully",
        updatedRole,
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}

export default Role;
