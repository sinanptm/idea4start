'use client';

import { Sparkles, Lightbulb } from 'lucide-react';
import { memo } from "react";
import useGetHomePageStatics from "@/hooks/api/useGetHomePageStatics";
import { Skeleton } from "@/components/ui/skeleton";

const formatNumber = (num: number) => {
    if (num < 5) return '5+';
    if (num < 10) return '10+';
    if (num < 100) return `${Math.ceil(num / 10) * 10}+`;
    if (num < 1000) return `${Math.ceil(num / 100) * 100}+`;
    return `${Math.ceil(num / 1000)}k+`;
};

const CountSection = () => {
    const { data, isLoading } = useGetHomePageStatics();

    return (
        <div className="flex flex-wrap gap-3 md:gap-6 justify-center text-center">
            <div className="flex items-center gap-1.5 md:gap-2">
                <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span className="text-xs md:text-sm font-medium">
                    {isLoading ? (
                        <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
                    ) : (
                        `${formatNumber(data?.totalIdeas || 0)} Ideas Shared`
                    )}
                </span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span className="text-xs md:text-sm font-medium">AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
                <svg className="h-4 w-4 md:h-5 md:w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" fill="currentColor" />
                    <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor" />
                </svg>
                <span className="text-xs md:text-sm font-medium">
                    {isLoading ? (
                        <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
                    ) : (
                        `${formatNumber(data?.totalUsers || 0)} Community Members`
                    )}
                </span>
            </div>
        </div>
    );
};

export default memo(CountSection);
