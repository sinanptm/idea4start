import { Router } from "express";
import authRoutes from "./authRoutes";
import authorizedRoutes from "./authorizedRoutes";
import unAuthorizedRoutes from "./unAuthorizedRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/", unAuthorizedRoutes);
router.use("/", authorizedRoutes);

export default router;