"use client";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import LogoIcon from "@/components/logo/LogoIcon";
import { Github, LogIn } from "lucide-react";
import { LoginDialogProps } from "@/types/props";


const LoginDialog = ({ trigger }: LoginDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
        setOpen(false);
    };

    const handleGithubSignIn = () => {
        signIn("github", { callbackUrl: "/" });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <span aria-label="Login" className="flex items-center gap-2">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-500 text-white">
                            <LogIn className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Login</span>
                            <span className="truncate text-xs">Sign in to your account</span>
                        </div>
                    </span>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card border-gray-800">
                <DialogHeader className="space-y-2 text-center">
                    <div className="flex justify-center">
                        <LogoIcon className="h-10 w-10" />
                    </div>
                    <DialogTitle className="text-xl font-bold">Sign in to Idea4Start</DialogTitle>
                    <DialogDescription>Continue with your preferred sign in method</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all flex items-center gap-2"
                            onClick={handleGoogleSignIn}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="h-5 w-5">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all flex items-center gap-2"
                            onClick={handleGithubSignIn}
                        >
                            <Github className="h-5 w-5" />
                            Continue with GitHub
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(LoginDialog)

