import { connect } from "mongoose";
import { MONGODB_URI } from "./index";
import { InternalServerError } from "@/domain/entities/CustomError";

const connectDb = async () => {
    try {
        await connect(MONGODB_URI);
    } catch (error) {
        throw new InternalServerError("Failed to connect to database", "connectDb");
    }
};

export default connectDb;