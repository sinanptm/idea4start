import express from "express";
import { PORT } from "./config";
import connectDb from "./config/connectDb";
import logger from "./utils/logger";
const app = express();

app.listen(PORT, () => {
    connectDb();
    logger.info(`Server is running on port ${PORT}`);
}); 
