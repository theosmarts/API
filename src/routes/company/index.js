import express from "express";
import Company from "./Company";

const companyRouter = express.Router();

companyRouter.post(
  "/companies",
  Company.validateData,
  Company.uniqueValues,
  Company.addCompany
);

companyRouter.get("/companies", Company.viewCompanies);

companyRouter.put("/companies/edit/:companyId", Company.editCompany);
companyRouter.get("/companies/:companyId", Company.getOneCompany);

companyRouter.put("/companies/deactivate/:companyId", Company.deActivate);

export default companyRouter;
