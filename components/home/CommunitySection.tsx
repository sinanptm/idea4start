import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users } from 'lucide-react';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import LoginDialog from "../auth/LoginDialog";

const communityMembers = [
    {
        name: "Alex Johnson",
        role: "Tech Entrepreneur",
        avatar: "https://github.com/shadcn.png",
        ideas: 12,
        comments: 48,
    },
    {
        name: "Maria Garcia",
        role: "UX Designer",
        avatar: "https://github.com/shadcn.png",
        ideas: 5,
        comments: 72,
    },
    {
        name: "David Kim",
        role: "Marketing Specialist",
        avatar: "https://github.com/shadcn.png",
        ideas: 8,
        comments: 36,
    },
    {
        name: "Priya Patel",
        role: "Fintech Founder",
        avatar: "https://github.com/shadcn.png",
        ideas: 15,
        comments: 93,
    },
];

const CommunitySection = () => {
    return (
        <div className="space-y-6 md:space-y-10 py-6 md:py-8 px-4">
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-primary mb-3 md:mb-4">
                    <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span className="text-xs md:text-sm font-medium">Growing Community</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Join Our Community of Innovators</h2>
                <p className="text-muted-foreground mt-3 md:mt-4 text-base md:text-lg">
                    Connect with passionate entrepreneurs, share insights, and collaborate on the next generation of startups
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4 md:space-y-6">
                    <h3 className="text-xl md:text-2xl font-semibold">Why Join Our Community?</h3>

                    <div className="space-y-3 md:space-y-4">
                        <div className="flex gap-3 md:gap-4">
                            <div className="bg-primary/10 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm md:text-base font-medium">Network with Like-minded Entrepreneurs</h4>
                                <p className="text-xs md:text-sm text-muted-foreground">Connect with founders who share your passion and vision</p>
                            </div>
                        </div>

                        <div className="flex gap-3 md:gap-4">
                            <div className="bg-primary/10 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm md:text-base font-medium">Get Valuable Feedback</h4>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Receive constructive input from experienced entrepreneurs and industry experts
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 md:gap-4">
                            <div className="bg-primary/10 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="h-4 w-4 md:h-5 md:w-5 text-primary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 5L12 2M12 2L9 5M12 2V8M7.2 10.8C7.2 9.12 8.56 7.8 10.2 7.8H13.8C15.44 7.8 16.8 9.12 16.8 10.8V17.4C16.8 19.08 15.44 20.4 13.8 20.4H10.2C8.56 20.4 7.2 19.08 7.2 17.4V10.8Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm md:text-base font-medium">Find Potential Co-founders</h4>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Discover partners with complementary skills to help bring your idea to life
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 md:gap-4">
                            <div className="bg-primary/10 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="h-4 w-4 md:h-5 md:w-5 text-primary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm md:text-base font-medium">Access Resources & Knowledge</h4>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Tap into our library of startup resources, guides, and learning materials
                                </p>
                            </div>
                        </div>
                    </div>

                    <LoginDialog trigger={
                        <Button size="lg" className="mt-2 w-full sm:w-auto">
                            Join Our Community
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    } />
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Active Community Members</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {communityMembers.map((member) => (
                            <Card key={member.name} className="bg-card/50 border-gray-800 hover:border-primary/30 transition-all">
                                <CardContent className="p-3 md:p-4 flex gap-3 md:gap-4">
                                    <Avatar className="h-12 w-12 md:h-16 md:w-16">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>

                                    <div className="space-y-1.5 md:space-y-2">
                                        <div>
                                            <h4 className="text-sm md:text-base font-medium">{member.name}</h4>
                                            <p className="text-xs md:text-sm text-muted-foreground">{member.role}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">
                                                {member.ideas} Ideas
                                            </Badge>
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">
                                                {member.comments} Comments
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-4 md:mt-6 text-center">
                        <Link
                            href="/community"
                            prefetch={false}
                            className="text-primary hover:underline text-xs md:text-sm font-medium inline-flex items-center"
                        >
                            View all community members
                            <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CommunitySection);
