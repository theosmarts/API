import express from 'express';
import Branch from './branch'

const branchRouter = express.Router();

branchRouter.post('/branch/:companyId', 
Branch.validateData,
Branch.validateCompanyId,
Branch.validateUniqueFields,
Branch.validateIsHeadOffice,
Branch.addBranch
)

branchRouter.get('/branch',
Branch.getAllBranches
)

branchRouter.get('/branch/:branchId', 
Branch.getOneBranch
)

branchRouter.get('/branch/get/:companyId',
Branch.validateCompanyId,
Branch.getCompanyBranches
)


branchRouter.put('/branch/update/:branchId', 
Branch.validateBranchId,
Branch.validateIsHeadOffice,
Branch.updateBranches
)

branchRouter.put('/branch/deactivate/:branchId',
Branch.deactivate
)
export default branchRouter;