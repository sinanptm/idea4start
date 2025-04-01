import { Router } from "express";

const router = Router();

router.use("/test", (req, res) => {
    res.send("Hello World");
});

export default router;