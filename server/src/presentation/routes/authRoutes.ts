import { Router } from "express";
import { userController } from "../di/controllers";
import { authMiddleware } from "../di/middlewares";

const router = Router();

router.post("/", userController.createUser.bind(userController));
router.use(authMiddleware.exec.bind(authMiddleware));
router.route("/")
    .get(userController.getProfile.bind(userController))
    .put(userController.updateUser.bind(userController))
    .delete(userController.logout.bind(userController));

export default router;