"use client";

import { memo } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import LogoIcon from "@/components/logo/LogoIcon";
import { Github } from 'lucide-react';

const LoginPage = () => {
    return (
        <Container>
            <div className="flex items-center justify-center min-h-screen px-4 py-12">
                <Card className="w-full max-w-md bg-card border-gray-800">
                    <CardHeader className="space-y-2 text-center">
                        <div className="flex justify-center">
                            <LogoIcon className="h-12 w-12" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                        <CardDescription>
                            Sign in to your account to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all flex items-center gap-2"
                                onClick={() => signIn("google")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="h-5 w-5">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all flex items-center gap-2"
                                onClick={() => signIn("github")}
                            >
                                <Github className="h-5 w-5" />
                                Continue with GitHub
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </Container>
    );
};

export default memo(LoginPage);
