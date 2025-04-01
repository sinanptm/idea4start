import express from "express";
import { CLIENT, PORT } from "./config";
import connectDb from "./config/connectDb";
import logger from "./utils/logger";
import cors from "cors";
import routes from "./presentation/routes";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: CLIENT,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use(helmet());
app.use(cookieParser());

app.use("/api", routes);

app.listen(PORT, () => {
    connectDb();
    logger.info(`Server is running on port ${PORT}`);
}); 
