import { Lightbulb, Users, TrendingUp, ArrowRight, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";

const workflowSteps = [
    {
        title: "Share Your Vision",
        description:
            "Post your startup idea with details about the problem it solves, target market, and potential business model.",
        icon: Lightbulb,
        color: "from-blue-500 to-cyan-400",
    },
    {
        title: "Get AI-Powered Feedback",
        description:
            "Our AI analyzes your idea, providing insights on market potential, competitive landscape, and improvement suggestions.",
        icon: Zap,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Connect & Collaborate",
        description: "Engage with entrepreneurs who share your passion, receive feedback, and form potential partnerships.",
        icon: Users,
        color: "from-amber-500 to-orange-400",
    },
    {
        title: "Refine Your Concept",
        description: "Use community feedback and AI insights to iterate on your idea and strengthen your business concept.",
        icon: MessageSquare,
        color: "from-emerald-500 to-green-400",
    },
    {
        title: "Launch & Grow",
        description:
            "Take your refined idea from concept to reality with resources, mentorship, and ongoing community support.",
        icon: TrendingUp,
        color: "from-rose-500 to-red-500",
    },
];

const HowItWorks = () => {
    return (
        <div className="space-y-10 py-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight">How Idea4Start Works</h2>
                <p className="text-muted-foreground mt-4 text-lg">
                    Our platform guides you through the entire journey from initial concept to launch-ready startup idea
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {workflowSteps.map((step, index) => (
                    <Card key={index} className="bg-card/50 border-gray-800 hover:border-primary/30 transition-all">
                        <CardContent className="p-6 space-y-4 text-center">
                            <div
                                className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color}`}
                            >
                                <step.icon aria-hidden="true" className="h-8 w-8 text-white" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                    <h3 className="text-lg font-semibold">{step.title}</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">{step.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center pt-4">
                <Button asChild size="lg">
                    <Link href="/about" prefetch={false}>
                        Learn More About Our Process
                        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default memo(HowItWorks)

