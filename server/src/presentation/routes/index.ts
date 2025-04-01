import { Router } from "express";
import authRoutes from "./authRoutes";
import ideaRoutes from "./ideaRoutes";
import commentRoutes from "./commentRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/test", (req, res) => {
    res.send("Hello World");
});

router.use("/auth", authRoutes);

router.use("/idea", ideaRoutes);

router.use("/comment", commentRoutes);

router.use("/user", userRoutes);

export default router;