import express from "express";
import Dashboard from "./Dashboard";

const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard/:email", Dashboard.getDashboardData);

export default dashboardRouter;
