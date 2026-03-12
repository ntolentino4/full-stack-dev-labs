import { Router } from "express";
import { getRoles, postRole } from "../controllers/roleController";

const router = Router();

router.get("/", getRoles);
router.post("/", postRole);

export default router;