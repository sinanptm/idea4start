import { memo } from "react";
import Container from "@/components/Container";
import { Sparkles, Users, Lightbulb, BarChart, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LoginDialog from "@/components/auth/LoginDialog";

const AboutPage = () => {
    return (
        <Container>
            <div className="space-y-12 md:space-y-16 lg:space-y-20 py-6 md:py-8">
                {/* Hero Section */}
                <div className="relative px-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl md:rounded-3xl -z-10" />
                    <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 py-10 md:py-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-primary mb-3 md:mb-4">
                            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            <span className="text-xs md:text-sm font-medium">About Idea4Start</span>
                        </div>

                        <div className="space-y-4 md:space-y-6 max-w-3xl">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Empowering Entrepreneurs</h1>
                            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                                Idea4Start is a platform dedicated to helping entrepreneurs validate, refine, and launch successful startups through AI-powered insights and community collaboration.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Mission */}
                <div className="space-y-6 md:space-y-8 px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Mission</h2>
                        <p className="text-muted-foreground mt-3 md:mt-4 text-base md:text-lg">
                            We&apos;re on a mission to democratize entrepreneurship by providing the tools, insights, and community support needed to turn innovative ideas into successful businesses.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-4">
                        <Card className="bg-card/50 border-gray-800 hover:border-primary/30 transition-all">
                            <CardContent className="p-6 space-y-4 text-center">
                                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                    <Lightbulb className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Inspire Innovation</h3>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        We foster a creative environment where entrepreneurs can explore and develop groundbreaking ideas that solve real-world problems.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 border-gray-800 hover:border-primary/30 transition-all">
                            <CardContent className="p-6 space-y-4 text-center">
                                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                    <Brain className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Empower with AI</h3>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        Our AI-powered tools provide data-driven insights that help entrepreneurs make informed decisions and avoid common pitfalls.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 border-gray-800 hover:border-primary/30 transition-all">
                            <CardContent className="p-6 space-y-4 text-center">
                                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                    <Users className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Build Community</h3>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        We connect like-minded entrepreneurs, creating opportunities for collaboration, mentorship, and growth.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Our Story */}
                <div className="space-y-6 md:space-y-8 px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Story</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
                            <p className="text-base md:text-lg">
                                Idea4Start was born from a simple observation: too many brilliant startup ideas never reach their potential due to lack of validation, feedback, and resources.
                            </p>

                            <p className="text-base md:text-lg">
                                Founded in 2023 by a team of entrepreneurs who experienced these challenges firsthand, we set out to create a platform that combines the power of AI with human creativity and collaboration.
                            </p>

                            <p className="text-base md:text-lg">
                                What started as a small community of passionate founders has grown into a thriving ecosystem of innovators, mentors, and investors united by a common goal: to transform great ideas into successful businesses.
                            </p>

                        </div>

                        <div className="bg-muted/20 rounded-xl p-6 order-1 lg:order-2">
                            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                <div className="text-center p-8">
                                    <BarChart className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                                    <p className="text-sm text-muted-foreground">
                                        Company timeline visualization would appear here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Join Us CTA */}
                <div className="py-8 md:py-12 px-4">
                    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                        <CardContent className="p-6 md:p-8 lg:p-12 flex flex-col items-center text-center space-y-6">
                            <div className="bg-primary/20 p-4 rounded-full">
                                <Sparkles className="h-8 w-8 text-primary" />
                            </div>

                            <div className="space-y-4 max-w-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Join Our Mission</h2>
                                <p className="text-base md:text-lg text-muted-foreground">
                                    Whether you&apos;re a first-time founder or a seasoned entrepreneur, Idea4Start provides the tools, insights, and community you need to bring your vision to life.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
                                <LoginDialog trigger={
                                    <Button size="lg" className="group w-full sm:w-auto">
                                        Create Account
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>
                                } />
                                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                                    <Link href="/ideas">Explore Ideas</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default memo(AboutPage);
