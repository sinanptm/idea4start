import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LogoIcon from '@/components/logo/LogoIcon';
import ShareIdeaButton from '@/components/ShareIdeaButton';

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center text-center space-y-6 ">
            <LogoIcon className="h-20 w-20" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Idea4Start
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
                Discover, share, and collaborate on innovative startup ideas with our growing community of entrepreneurs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild
                    className="gap-2 bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all"
                    variant="outline"
                >
                    <Link href="/ideas">
                        Explore Ideas <ArrowRight aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                </Button>
                <ShareIdeaButton />
            </div>
        </div>
    );
};

export default memo(HeroSection);