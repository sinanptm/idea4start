import { Router } from "express";
import { userController } from "../di/controllers";
import { authMiddleware } from "../di/middlewares";

const router = Router();

router.use(authMiddleware.exec);
router.route("/")
    .get(userController.getProfile)
    .put(userController.updateUser)
    .post(userController.createUser)
    .delete(userController.logout);

export default router;