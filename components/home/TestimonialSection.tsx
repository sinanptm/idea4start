import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote:
            "Idea4Start helped me refine my SaaS concept and connect with a technical co-founder. Six months later, we've secured seed funding and launched our beta!",
        author: {
            name: "Jessica Wong",
            role: "Founder, TaskFlow",
            avatar: "/placeholder.svg?height=48&width=48",
        },
    },
    {
        quote:
            "The AI feedback was spot-on! It identified market gaps I hadn't considered and helped me pivot my idea to a much more viable business model.",
        author: {
            name: "Marcus Chen",
            role: "CEO, GreenDelivery",
            avatar: "/placeholder.svg?height=48&width=48",
        },
    },
    {
        quote:
            "As a solo founder, the community feedback was invaluable. I received constructive criticism that helped me avoid costly mistakes early in my journey.",
        author: {
            name: "Sophia Rodriguez",
            role: "Founder, EdTech Solutions",
            avatar: "/placeholder.svg?height=48&width=48",
        },
    },
];

const TestimonialSection = () => {
    return (
        <div className="space-y-8 py-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Success Stories</h2>
                <p className="text-muted-foreground mt-2">Hear from entrepreneurs who turned their ideas into reality</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-card/50 border-gray-800 hover:border-primary/30 transition-all">
                        <CardContent className="p-6 space-y-4">
                            <Quote className="h-8 w-8 text-primary/40" />

                            <p className="italic text-muted-foreground">&quot;{testimonial.quote}&quot;</p>

                            <div className="flex items-center gap-3 pt-2">
                                <Avatar>
                                    <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                                    <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div>
                                    <h4 className="font-medium">{testimonial.author.name}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default memo(TestimonialSection)

