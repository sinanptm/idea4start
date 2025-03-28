"use client";

import { useState } from "react";
import ShareIdeaForm from "@/components/form/ShareIdeaForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from "next/link";

export default function CreateIdeaPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSuccess = () => {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-10">
                {isSubmitted ? (
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sm:p-10 text-center space-y-4 sm:space-y-6 w-full max-w-lg mx-auto">
                            <div className="flex justify-center">
                                <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Thank you for sharing your idea!
                                </h2>
                                <p className="text-sm sm:text-base text-gray-300">
                                    Your startup idea has been submitted successfully and will be reviewed shortly.
                                </p>
                            </div>
                            <div className="pt-6 flex justify-center gap-3 sm:gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-sm sm:text-base border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200"
                                >
                                    Submit Another
                                </Button>
                                <Button
                                    asChild
                                    className="text-sm sm:text-base bg-white hover:bg-gray-200 text-black transition-all duration-200"
                                >
                                    <Link href="/ideas">
                                        View All Ideas
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center mb-4 sm:mb-6">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1 text-xs sm:text-sm text-gray-400 hover hover:bg-gray-800"
                                asChild
                            >
                                <Link href="/ideas">
                                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                    Back to Ideas
                                </Link>
                            </Button>
                        </div>

                        <div className="mb-4 sm:mb-8">
                            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 sm:mb-3">
                                Share Your Startup Idea
                            </h1>
                            <p className="text-sm sm:text-base text-gray-400">
                                Fill out the form below to share your startup idea with the community.
                            </p>
                        </div>

                        <ShareIdeaForm onSuccess={handleSuccess} />
                    </>
                )}
            </div>
        </div>
    );
}
