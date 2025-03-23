import { Sparkles, CheckCircle, LineChart, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const AiSection = () => {
    return (
        <div className="space-y-6 py-12  border-gray-800">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">AI-Powered Idea Validation</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Get instant feedback on your startup ideas with our AI tools
                </p>
            </div>

            {/* Features in a clean horizontal layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center text-center p-5 border border-gray-800 rounded-lg bg-card/50 hover:border-primary/30 transition-colors">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-1">AI Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                        Get personalized suggestions to improve your startup idea
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-5 border border-gray-800 rounded-lg bg-card/50 hover:border-primary/30 transition-colors">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-1">Idea Validation</h3>
                    <p className="text-sm text-muted-foreground">
                        AI analysis of strengths, weaknesses, and market potential
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-5 border border-gray-800 rounded-lg bg-card/50 hover:border-primary/30 transition-colors">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                        <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-1">Market Insights</h3>
                    <p className="text-sm text-muted-foreground">
                        Understand your target market and business opportunities
                    </p>
                </div>
            </div>

            {/* Simple CTA Button */}
            <div className="flex justify-center mt-6">
                <Button className="group" asChild>
                    <Link href="/share-idea">
                        Try AI Validation
                        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default AiSection;