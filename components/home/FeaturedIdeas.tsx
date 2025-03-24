'use client';

import { memo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetHomePageStatics from "@/hooks/api/useGetHomePageStatics";
import FeaturedIdeaSkeleton from "./FeaturedIdeaSkeleton";
import StageBadge from "@/components/StageBadge";
const FeaturedIdeas = () => {
    const { data, isLoading } = useGetHomePageStatics();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Featured Ideas</h2>
                    <p className="text-muted-foreground mt-1">Discover trending startup concepts of this week from our community</p>
                </div>
                <Button variant="ghost" asChild className="hidden sm:flex">
                    <Link href="/ideas">
                        View all ideas <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <FeaturedIdeaSkeleton />
                ) : (
                    data?.trendingIdeas.map((idea) => (
                        <Card
                            key={idea._id}
                            className="bg-card border-gray-800 hover:border-primary/50 transition-all flex flex-col h-full"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <StageBadge stage={idea.stage} />
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        {idea.businessModel}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl mt-3 line-clamp-2">{idea.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground line-clamp-3">{idea.description}</p>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 pt-2">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                        <Heart className={`h-4 w-4 ${idea.userLiked ? 'text-red-500 fill-red-500' : ''}`} />
                                        {idea.upVoteCount}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={idea.user?.image || 'https://github.com/shadcn.png'} alt={idea.user?.name || ''} />
                                            <AvatarFallback>{idea.user?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{idea.user?.name}</span>
                                    </div>
                                </div>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={`/ideas/${idea._id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>

            <div className="flex justify-center sm:hidden">
                <Button variant="outline" asChild>
                    <Link href="/ideas">
                        View all ideas <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default memo(FeaturedIdeas)

