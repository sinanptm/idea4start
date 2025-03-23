import { Lightbulb, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { memo } from "react";

const ThisIsHowItWorks = [
    {
        title: "Discover Ideas",
        description: "Browse through our curated collection of innovative startup ideas across various industries",
        icon: Lightbulb,
    },
    {
        title: "Connect & Collaborate",
        description: "Engage with like-minded entrepreneurs, provide feedback, and form potential partnerships",
        icon: Users,
    },
    {
        title: "Launch & Grow",
        description: "Take your idea from concept to reality with resources, mentorship, and community support",
        icon: TrendingUp,
    },
];

const HowItWorks = () => {
    return (
        <div className="space-y-8 py-12 border-t border-gray-800">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
                <p className="text-muted-foreground mt-2">Join our community and start your entrepreneurial journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ThisIsHowItWorks.map((item) => (
                    <div key={item.title} className="space-y-4">
                        <item.icon aria-hidden="true" className="h-12 w-12 text-primary" />
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center pt-4">
                <Button asChild>
                    <Link href="/about" prefetch={false}>
                        Learn More About Us
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default memo(HowItWorks);