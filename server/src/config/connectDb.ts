import { connect } from "mongoose";
import { MONGODB_URI } from "./index";
import { InternalServerError } from "@/domain/entities/CustomError";
import logger from "@/utils/logger";

const connectDb = async () => {
    try {
        await connect(MONGODB_URI);
    } catch (error) {
        logger.error(`Failed to connect to database: ${error}`);
        throw new InternalServerError("Failed to connect to database", "connectDb");
    }
};

export default connectDb;