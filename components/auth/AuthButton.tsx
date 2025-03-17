'use client';

import { LogIn, LogOut } from 'lucide-react';
import { memo } from 'react';
import { signIn, signOut } from "next-auth/react";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthButton = ({ session }: { session: any }) => {

    if (session?.user) {
        return (
            <button
                onClick={() => signOut()}
                className="flex items-center gap-2"
            >
                <div className="bg-red-500 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                    <LogOut className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="font-medium">Logout</span>
                    <span className="text-xs">{session.user.name}</span>
                </div>
            </button>
        );
    }

    return (
        <button
            onClick={() => signIn("google")}
            className="flex items-center gap-2"
        >
            <div className="bg-green-500 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                <LogIn className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="font-medium">Login</span>
                <span className="text-xs">Sign in to your account</span>
            </div>
        </button>
    );
};

export default memo(AuthButton);