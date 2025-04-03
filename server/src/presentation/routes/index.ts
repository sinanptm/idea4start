import { Router } from "express";
import authRoutes from "./authRoutes";
import authorizedRoutes from "./authorizedRoutes";
import unAuthorizedRoutes from "./unAuthorizedRoutes";
import { errorHandler } from "../di/middlewares";

const router = Router();

router.use("/auth", authRoutes);
router.use("/", unAuthorizedRoutes);
router.use("/", authorizedRoutes);

router.use(errorHandler);

export default router;