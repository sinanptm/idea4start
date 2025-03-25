import { withErrorHandler } from "@/lib/utils";
import validateSessionData from "@/lib/validateSessionData";
import { StatusCode } from "@/types";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
    const { user, success, message } = await validateSessionData();

    if (!success) {
        return NextResponse.json({ message }, { status: StatusCode.Unauthorized });
    }

    return NextResponse.json(user, { status: StatusCode.Ok });
});

export const PUT = withErrorHandler(async (request: Request) => {
    const { user, success, message } = await validateSessionData();

    if (!success) return NextResponse.json({ message }, { status: StatusCode.Unauthorized });

    const { name, designation, website, github, linkedin, buyMeACoffee, twitter } = await request.json();

    console.log(name, designation, website, github, linkedin, buyMeACoffee, twitter);

    return NextResponse.json({ user }, { status: StatusCode.Ok });
});
