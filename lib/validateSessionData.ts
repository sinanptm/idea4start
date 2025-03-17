import { auth } from "@/auth";
import User from "./db/models/User";

const validateSessionData = async () => {
    const session = await auth();
    if (!session) {
        return {
            success: false,
            message: "Unauthorized"
        };
    }

    const user = await User.findOne({ email: session.user?.email }).lean();
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
}


export default validateSessionData;