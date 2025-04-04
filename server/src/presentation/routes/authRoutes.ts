import { Router } from "express";
import { userController } from "../di/controllers";

const router = Router();

router.get("/", userController.getProfile);
router.put("/", userController.updateUser);
router.post("/", userController.createUser);
router.delete("/", userController.logout);

export default router;