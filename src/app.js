import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user/index';
import companyRouter from './routes/company/index';
import branchRouter from './routes/branch/index';
import rolesRouter from './routes/roles/index';
import userRouter from './routes/user/index';
import permissionsRouter from './routes/permisions/index';
import dashboardRouter from './routes/dashboard/index';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//prefix route api/v1
const v1Route = "/api/v1";

//User routes
app.use(v1Route, userRoutes);
app.use(v1Route, companyRouter);
app.use(v1Route, branchRouter);
app.use(v1Route, rolesRouter);
app.use(v1Route, userRouter);
app.use(v1Route, permissionsRouter);
app.use(v1Route, dashboardRouter);

export default app;
