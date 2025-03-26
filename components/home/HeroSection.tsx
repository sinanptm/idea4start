import { ArrowRight } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoIcon from "@/components/logo/LogoIcon";
import CountSection from "./CountSection";

const HeroSection = () => {
    return (
        <div className="relative px-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl md:rounded-3xl -z-10" />
            <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 py-10 md:py-16">
                <div className="flex items-center gap-2 md:gap-3">
                    <LogoIcon className="h-8 w-8 md:h-12 md:w-12" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Idea4Start</h1>
                </div>

                <div className="space-y-4 md:space-y-6 max-w-3xl">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Where Great Startups Begin
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                        Share your startup vision, discover innovative ideas, and connect with a community of passionate
                        entrepreneurs ready to turn concepts into reality.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center w-full sm:w-auto">
                    <Link href="/ideas" className="w-full sm:w-auto">
                        <Button
                            className="gap-2 bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all w-full"
                            variant="outline"
                            size="lg"
                        >
                            Explore Ideas <ArrowRight aria-hidden="true" className="h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                    </Link>
                    <Link href="/share-idea" className="w-full sm:w-auto">
                        <Button
                            className="gap-2 bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all w-full"
                            size="lg"
                            variant="outline"
                        >
                            Share Your Idea <ArrowRight aria-hidden="true" className="h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                    </Link>
                </div>

                <CountSection />
            </div>
        </div>
    );
};

export default memo(HeroSection)

