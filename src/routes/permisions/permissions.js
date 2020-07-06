import { isExpectedObject, isEmail, isEmpty, isPhoneNumber } from '../../utils/GlobalValidation';
import db, { sequelize } from '../../database/models/index';

class Permissions {
    static async validateFeatureId(req, res, next) {
        try {
            const featureId = await db.Features.findOne({ where: { id: req.params.featureId } })
            if (!featureId) {
                res.status(401).send({
                    status: 'error',
                    message: 'invalid feature ID error'
                })
            }
            else { next() }

        }
        catch (error) {
            console.log(error)
            res.status(500).send({ error })
        }
    }

    static async validateRoleId(req, res, next) {
        try {
            const roleId = await db.Role.findOne({ where: { id: req.params.roleId } })
            if (!roleId) {
                res.status(401).send({
                    status: 'error',
                    message: 'invalid RoleId error'
                })
            }
            else{next()}

        }
        catch (error) {
            console.log(error)
            res.status(500).send({ error })
        }
    }

    static async permissionExist(req, res, next) {
        try {
            const permission = await db.permissions.findOne({ where: { roleId: req.params.roleId, featureId: req.params.featureId} })
            if (permission) {
                res.status(401).send({
                    status: 'error',
                    message: 'permision already exists exist'
                })
            }
            else{next()}

        }
        
        catch (error) {
            console.log(error)
            res.status(500).send({ error })
        }
    }

    static async addPermision(req, res, next){
        try{
            const permission = await db.permissions.create({
                roleId: req.params.roleId,
                featureId: req.params.featureId,
                ...req.body
            })

            res.status(200).send({
                status: 'success',
                message: 'permission added',
                permission
            })
        }
        catch(error){
            console.log(error)
            res.status(500).send({
                status: 'error',
                error
            })
        }
    }

    static async getRolePermissions(req, res, next){
        try{
            const permissions = await sequelize.query(`exec getRolePermissions @roleId = '${req.params.roleId}'`)
            res.status(200).send({
                status: 'success',
                permissions:permissions[0]
            })
        }
        catch(error){
            res.status(500).send({
                error
            })
        }
    }

    static async updateRole(req, res, next){
            try{
                const update = await db.permissions.update({...req.body}, {where: { roleId: req.params.roleId, featureId: req.params.featureId} })
                if(update[0] > 0){
                    res.status(200).send({
                        status: 'success',
                        message: 'updated successfully'
                    })
                }
                else{
                    res.status(200).send({
                        status: 'error',
                        message: 'Recieved an invalid object'
                    })
                }
                res.status(200).send({update})
            }
            catch(error){
                console.log(error)
                res.status(500).send({
                    error
                })
            }
    }
}

export default Permissions;