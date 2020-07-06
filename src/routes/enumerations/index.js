import express from "express";
import Enumeration from "./enumerations";

const enumerationRouter = express.Router();

enumerationRouter.get("/enumerations", Enumeration.getEnumerations);

export default enumerationRouter;
