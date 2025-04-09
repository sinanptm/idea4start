"use client";
import { useSession } from "next-auth/react";

export default function Component() {
    const { data: session } = useSession();

    // Access the token
    const token = session?.accessToken;

    if (token && typeof window !== "undefined" && localStorage.getItem("user-token") === null) {
        localStorage.setItem("user-token", token);
    }
    return null;
}