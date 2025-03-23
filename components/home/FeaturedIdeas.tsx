'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import useGetIdeas from '@/hooks/api/useGetIdeas';
import { memo } from 'react';
import StageBadge from '../idea/StageBadge';
import IdeaCardSkeleton from './IdeaCardSkeleton';

const FeaturedIdeas = () => {
    const { data, isLoading } = useGetIdeas({ limit: 3, sort: "trending", timePeriod: "week" });

    return (
        <div className="space-y-6 py-12 border-t border-gray-800">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Featured Ideas</h2>
                <Button variant="ghost" asChild className="gap-1">
                    <Link href="/ideas" prefetch={false}>
                        View All
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <IdeaCardSkeleton />
                ) : (
                    data?.ideas.map((idea) => (
                        <Card key={idea._id} className="bg-card border-gray-800 hover:border-primary/50 transition-colors">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <StageBadge stage={idea.stage} />
                                    <div className="flex items-center gap-1 text-sm">
                                        <span>{idea.businessModel}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{idea.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {idea.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {idea.tags?.map((tag) => (
                                        <span key={tag} className="bg-muted px-2 py-1 rounded-full text-xs">{tag}</span>
                                    ))}
                                    {idea.tags && idea.tags.length > 3 && (
                                        <span className="bg-muted px-2 py-1 rounded-full text-xs">+{idea.tags.length - 3}</span>
                                    )}
                                </div>
                                <Button variant="ghost" asChild className="w-full justify-between">
                                    <Link prefetch={false} href={`/ideas/${idea._id}`}>
                                        View Details
                                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default memo(FeaturedIdeas);
