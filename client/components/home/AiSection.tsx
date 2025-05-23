import { Sparkles, CheckCircle, LineChart, ArrowRight, Brain, Target, Lightbulb, Zap, TrendingUp, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";

const AiSection = () => {
    return (
        <div className="space-y-8 py-6 md:space-y-10 md:py-8">
            <div className="text-center max-w-3xl mx-auto px-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-primary mb-3 md:mb-4">
                    <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span className="text-xs md:text-sm font-medium">AI-Powered Platform</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Supercharge Your Startup Ideas</h2>
                <p className="text-muted-foreground mt-3 md:mt-4 text-base md:text-lg">
                    Our advanced AI tools analyze your startup concepts, providing valuable insights and recommendations to
                    increase your chances of success
                </p>
            </div>

            <Tabs defaultValue="validation" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
                    <TabsTrigger value="validation" className="text-xs sm:text-sm">Idea Validation</TabsTrigger>
                    <TabsTrigger value="market" className="text-xs sm:text-sm">Market Analysis</TabsTrigger>
                    <TabsTrigger value="recommendations" className="text-xs sm:text-sm">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="validation" className="mt-4 md:mt-6 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-xl md:text-2xl font-semibold">Validate Your Concept</h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Our AI evaluates your startup idea across multiple dimensions to identify strengths and potential
                                challenges before you invest significant time and resources.
                            </p>

                            <div className="space-y-3 md:space-y-4">
                                <div className="flex gap-2 md:gap-3">
                                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Problem-Solution Fit</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Assess how well your solution addresses the identified problem
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 md:gap-3">
                                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Uniqueness Analysis</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Evaluate your idea&apos;s differentiation from existing solutions
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 md:gap-3">
                                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Feasibility Score</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Determine the technical and operational viability of your concept
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="bg-card/50 border-gray-800">
                            <CardContent className="p-4 md:p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <h4 className="text-sm md:text-base font-medium">Idea Validation Report</h4>
                                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                                            Strong Potential
                                        </Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs md:text-sm mb-1">
                                                <span>Problem-Solution Fit</span>
                                                <span className="font-medium">85%</span>
                                            </div>
                                            <div className="h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                                    style={{ width: "85%" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs md:text-sm mb-1">
                                                <span>Market Opportunity</span>
                                                <span className="font-medium">72%</span>
                                            </div>
                                            <div className="h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                                    style={{ width: "72%" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs md:text-sm mb-1">
                                                <span>Competitive Advantage</span>
                                                <span className="font-medium">68%</span>
                                            </div>
                                            <div className="h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                                    style={{ width: "68%" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs md:text-sm mb-1">
                                                <span>Feasibility</span>
                                                <span className="font-medium">90%</span>
                                            </div>
                                            <div className="h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                                    style={{ width: "90%" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 p-3 md:p-4 rounded-lg">
                                        <h5 className="text-sm md:text-base font-medium mb-1 md:mb-2">AI Insights</h5>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            &quot;This concept shows strong potential with excellent problem-solution fit. Consider expanding your
                                            target market analysis and refining your revenue model for maximum impact.&quot;
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="market" className="mt-4 md:mt-6 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-xl md:text-2xl font-semibold">Market Intelligence</h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Our AI analyzes market trends, competitor landscapes, and customer segments to help you position your
                                startup for success.
                            </p>

                            <div className="space-y-3 md:space-y-4">
                                <div className="flex gap-2 md:gap-3">
                                    <Target className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Target Audience Analysis</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Identify ideal customer segments and their specific needs
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 md:gap-3">
                                    <LineChart className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Market Size Estimation</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Calculate your total addressable market and growth potential
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 md:gap-3">
                                    <Brain className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Competitive Landscape</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Map out existing competitors and identify market gaps
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card/50 border border-gray-800 rounded-lg p-4 md:p-6">
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <h4 className="text-sm md:text-base font-medium mb-2 md:mb-3">Market Opportunity Map</h4>
                                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                        <div className="text-center p-4 md:p-8">
                                            <LineChart className="h-12 w-12 md:h-16 md:w-16 text-primary/40 mx-auto mb-3 md:mb-4" />
                                            <p className="text-xs md:text-sm text-muted-foreground">
                                                Interactive market opportunity visualization would appear here based on your specific idea
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm md:text-base font-medium mb-1 md:mb-2">Key Market Insights</h4>
                                    <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                                        <li className="flex gap-1.5 md:gap-2">
                                            <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0 mt-0.5" />
                                            <span>Market growing at 18.5% CAGR through 2028</span>
                                        </li>
                                        <li className="flex gap-1.5 md:gap-2">
                                            <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0 mt-0.5" />
                                            <span>3 major competitors with 65% market share</span>
                                        </li>
                                        <li className="flex gap-1.5 md:gap-2">
                                            <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0 mt-0.5" />
                                            <span>Underserved segment: small businesses (10-50 employees)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-4 md:mt-6 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-xl md:text-2xl font-semibold">Strategic Recommendations</h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Our AI provides actionable suggestions to strengthen your idea, refine your business model, and maximize
                                your chances of success.
                            </p>

                            <div className="space-y-3 md:space-y-4">
                                <div className="flex gap-2 md:gap-3">
                                    <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Feature Prioritization</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Identify which features will deliver the most value to users
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 md:gap-3">
                                    <Zap className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Go-to-Market Strategy</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Suggestions for effective market entry and customer acquisition
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 md:gap-3">
                                    <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium">Growth Opportunities</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            Identify potential expansion paths and revenue streams
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card/50 border border-gray-800 rounded-lg p-4 md:p-6">
                            <h4 className="text-sm md:text-base font-medium mb-3 md:mb-4">AI-Generated Recommendations</h4>

                            <div className="space-y-3 md:space-y-4">
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 md:p-4">
                                    <div className="flex gap-1.5 md:gap-2 mb-1 md:mb-2">
                                        <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0" />
                                        <h5 className="text-sm md:text-base font-medium">MVP Focus</h5>
                                    </div>
                                    <p className="text-xs md:text-sm text-muted-foreground">
                                        &quot;Focus your initial release on the core user authentication, idea submission, and basic feedback
                                        features. Delay the advanced analytics until you&apos;ve validated user engagement.&quot;
                                    </p>
                                </div>

                                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 md:p-4">
                                    <div className="flex gap-1.5 md:gap-2 mb-1 md:mb-2">
                                        <Users className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                                        <h5 className="text-sm md:text-base font-medium">Target Audience</h5>
                                    </div>
                                    <p className="text-xs md:text-sm text-muted-foreground">
                                        &quot;Your solution resonates strongly with early-stage founders and student entrepreneurs. Consider
                                        partnerships with university entrepreneurship programs for initial traction.&quot;
                                    </p>
                                </div>

                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 md:p-4">
                                    <div className="flex gap-1.5 md:gap-2 mb-1 md:mb-2">
                                        <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                                        <h5 className="text-sm md:text-base font-medium">Revenue Model</h5>
                                    </div>
                                    <p className="text-xs md:text-sm text-muted-foreground">
                                        &quot;A freemium model with premium features for serious founders would balance growth and monetization.
                                        Consider offering advanced AI insights as a premium feature.&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="flex justify-center pt-2 md:pt-4 px-4">
                <Button asChild size="lg" className="group w-full sm:w-auto">
                    <Link href="/share-idea" prefetch={false}>
                        Try AI Validation Now
                        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default memo(AiSection);
