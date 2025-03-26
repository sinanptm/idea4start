'use client';

import { memo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetHomePageStatics from "@/hooks/api/useGetHomePageStatics";
import FeaturedIdeaSkeleton from "./FeaturedIdeaSkeleton";
import StageBadge from "@/components/StageBadge";

const FeaturedIdeas = () => {
    const { data, isLoading } = useGetHomePageStatics();

    return (
        <div className="space-y-6 md:space-y-8 px-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">Featured Ideas</h2>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">Discover trending startup concepts of this week from our community</p>
                </div>
                <Button variant="ghost" asChild className="hidden sm:flex">
                    <Link href="/ideas">
                        View all ideas <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {isLoading ? (
                    <FeaturedIdeaSkeleton />
                ) : (
                    data?.trendingIdeas.map((idea) => (
                        <Card
                            key={idea._id}
                            className="bg-card border-gray-800 hover:border-primary/50 transition-all flex flex-col h-full"
                        >
                            <CardHeader className="pb-3 md:pb-4">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <StageBadge stage={idea.stage} />
                                    <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                                        {idea.businessModel}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg md:text-xl mt-2 md:mt-3 line-clamp-2">{idea.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm md:text-base text-muted-foreground line-clamp-3">{idea.description}</p>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-3 md:space-y-4 pt-1 md:pt-2">
                                <div className="flex justify-between items-center w-full">

                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <Avatar className="h-5 w-5 md:h-6 md:w-6">
                                            <AvatarImage src={idea.user?.image || 'https://github.com/shadcn.png'} alt={idea.user?.name || ''} />
                                            <AvatarFallback>{idea.user?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs md:text-sm">{idea.user?.name}</span>
                                    </div>
                                </div>
                                <Button variant="outline" asChild className="w-full text-xs md:text-sm py-1.5 md:py-2 h-auto">
                                    <Link href={`/ideas/${idea._id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>

            <div className="flex justify-center sm:hidden">
                <Button variant="outline" asChild className="w-full sm:w-auto">
                    <Link href="/ideas">
                        View all ideas <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default memo(FeaturedIdeas);
