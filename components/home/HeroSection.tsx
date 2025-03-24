import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LogoIcon from '@/components/logo/LogoIcon';
import CountSection from './CountSection';

const HeroSection = () => {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl -z-10" />
            <div className="flex flex-col items-center text-center space-y-8 py-16 px-4">
                <div className="flex items-center gap-3">
                    <LogoIcon className="h-12 w-12" />
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                        Idea4Start
                    </h1>
                </div>

                <div className="space-y-6 max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Where Great Startups Begin
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Share your startup vision, discover innovative ideas, and connect with a community of passionate entrepreneurs ready to turn concepts into reality.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/ideas">
                        <Button
                            className="gap-2 bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all"
                            variant="outline"
                            size="lg"
                        >
                            Explore Ideas <ArrowRight aria-hidden="true" className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/share-idea">
                        <Button
                            className="gap-2 bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all"
                            size="lg"
                            variant="outline"
                        >
                            Share Your Idea <ArrowRight aria-hidden="true" className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>

                <CountSection />
            </div>
        </div>
    );
};

export default memo(HeroSection);
