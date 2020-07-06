import express from 'express';
import Permissions from './permissions'

const permissionsRouter = express.Router();

//add permissions
permissionsRouter.post('/permissions/:roleId/:featureId', 
    Permissions.validateFeatureId,
    Permissions.validateRoleId,
    Permissions.permissionExist,
    Permissions.addPermision
)
permissionsRouter.get('/permissions/:roleId',
    Permissions.validateRoleId,
    Permissions.getRolePermissions
)
permissionsRouter.put('/permissions/:roleId/:featureId',
    Permissions.validateFeatureId,
    Permissions.validateRoleId,
    Permissions.updateRole
)

export default permissionsRouter;
