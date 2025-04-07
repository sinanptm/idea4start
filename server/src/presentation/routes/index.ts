import { Router } from "express";
import authRoutes from "./authRoutes";
import ideaRoutes from "./ideaRoutes";
import { authMiddleware, errorHandler } from "../di/middlewares";
import { homePageController, suggestionController } from "../di/controllers";

const router = Router();

router.use("/auth", authRoutes);
router.use("/idea", ideaRoutes);

router.get("/suggestions", authMiddleware.exec, suggestionController.getSuggestions.bind(suggestionController));
router.get("/", homePageController.getHomePageStatics.bind(homePageController));

router.use(errorHandler);

export default router;