import { Router } from "express";
import { userController } from "../di/controllers";

const router = Router();

router.route("/")
    .get(userController.getProfile)
    .put(userController.updateUser)
    .post(userController.createUser)
    .delete(userController.logout);

export default router;