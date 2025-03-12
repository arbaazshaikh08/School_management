import { Router } from "express";
import { addSchool, listSchools } from "../controller/student.controller.js";

const router = Router();

router.route("/addSchool").post(addSchool);
router.route("/listSchool").get(listSchools);

export default router;
