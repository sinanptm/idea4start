import { auth } from "@/auth";
import User from "./db/models/User";
import connectDB from "./db/connect";

connectDB();

const validateSessionData = async () => {
    const session = await auth();

    if (!session) {
        return {
            success: false,
            message: "Unauthorized"
        };
    }

    const user = await User.findById(session.user?.id).lean();
    if (!user) {
        return {
            success: false,
            message: "User not found"
        };
    }
    return {
        success: true,
        message: "Session validated",
        user
    };
};


export default validateSessionData;