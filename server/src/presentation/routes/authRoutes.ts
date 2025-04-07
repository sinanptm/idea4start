import { Router } from "express";
import { userController } from "../di/controllers";
import { authMiddleware } from "../di/middlewares";

const router = Router();

router.post("/", userController.createUser);
router.use(authMiddleware.exec);
router.route("/")
    .get(userController.getProfile)
    .put(userController.updateUser)
    .delete(userController.logout);

export default router;