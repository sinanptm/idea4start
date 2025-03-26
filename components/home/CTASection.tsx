import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { memo } from "react";
import Link from "next/link";
import { ArrowRight, Lightbulb } from 'lucide-react';

const CTASection = () => {
    return (
        <div className="py-8 md:py-12 px-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6 md:p-8 lg:p-12 flex flex-col items-center text-center space-y-4 md:space-y-6">
                    <div className="bg-primary/20 p-3 md:p-4 rounded-full">
                        <Lightbulb className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>

                    <div className="space-y-2 md:space-y-4 max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Turn Your Vision Into Reality</h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Join thousands of entrepreneurs who have shared their startup concepts, received valuable feedback, and
                            connected with potential co-founders and investors.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 w-full sm:w-auto">
                        <Button asChild size="lg" className="group w-full sm:w-auto">
                            <Link href="/share-idea">
                                Share Your Idea
                                <ArrowRight
                                    aria-hidden="true"
                                    className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                                />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                            <Link href="/ideas">Explore Ideas</Link>
                        </Button>
                    </div>

                    <p className="text-xs md:text-sm text-muted-foreground pt-1 md:pt-2">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(CTASection);
