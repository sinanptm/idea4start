import { IIdea } from "@/types/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar, Lightbulb, Beaker, Rocket, Flag, BarChart } from "lucide-react";
import { format } from "date-fns";
import { BusinessModel } from "@/types";

interface IdeaDetailSidebarProps {
  idea: IIdea;
}

export default function IdeaDetailSidebar({ idea }: IdeaDetailSidebarProps) {
  const { createdAt, businessModel, stage } = idea;

  // Format business model for display
  const formatBusinessModel = (model?: BusinessModel) => {
    if (!model) return "Not specified";
    return model.replace(/([A-Z])/g, " $1").trim();
  };

  // Stage information
  const stageInfo = {
    idea: {
      icon: Lightbulb,
      label: "Idea",
      description: "Initial concept without validation",
    },
    validation: {
      icon: BarChart,
      label: "Validation",
      description: "Testing market demand and feasibility",
    },
    prototype: {
      icon: Beaker,
      label: "Prototype",
      description: "Working model to demonstrate functionality",
    },
    mvp: {
      icon: Rocket,
      label: "MVP",
      description: "Minimum viable product with core features",
    },
    launched: {
      icon: Flag,
      label: "Launched",
      description: "Product is live and available to users",
    },
  };

  const StageIcon = stage && stageInfo[stage] ? stageInfo[stage].icon : Lightbulb;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Idea Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Posted On</div>
              <div className="text-sm text-muted-foreground">{format(new Date(createdAt), "MMMM d, yyyy")}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StageIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Current Stage</div>
              <div className="text-sm text-muted-foreground">
                {stage ? stageInfo[stage].label : "Not specified"} - {stage ? stageInfo[stage].description : ""}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Business Model</div>
              <div className="text-sm text-muted-foreground">{formatBusinessModel(businessModel as BusinessModel)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Button className="w-full flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Join Discussion</span>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Have a similar idea?</h3>
            <p className="text-sm text-muted-foreground">Share your own version or collaborate with the creator</p>
            <Button variant="outline" className="mt-2 w-full">
              Share Your Idea
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

