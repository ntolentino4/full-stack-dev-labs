import { Router } from "express";
import { getDepartments, getEmployees, postEmployee } from "../controllers/employeeController";

const router = Router();

router.get("/", getEmployees);
router.get("/departments", getDepartments);
router.post("/", postEmployee);

export default router;