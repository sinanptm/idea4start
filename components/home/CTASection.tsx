import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { memo } from "react";
import ShareIdeaButton from "../ShareIdeaButton";

const CTASection = () => {
    return (
        <div className="py-12">
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-2xl font-bold tracking-tight">Ready to Share Your Idea?</h2>
                        <p className="text-muted-foreground">
                            Join thousands of entrepreneurs who have shared their startup concepts and received valuable feedback
                        </p>
                    </div>
                    <Button size="lg" asChild>
                        <ShareIdeaButton />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(CTASection);