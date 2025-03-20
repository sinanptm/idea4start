import type { IIdea } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, AlertTriangle } from "lucide-react";

interface IdeaDetailContentProps {
  idea: IIdea;
}

export default function IdeaDetailContent({ idea }: IdeaDetailContentProps) {
  const { description, problemStatement, tags, industry, relatedUrls, risks } = idea;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{description}</p>

          {tags && tags.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-secondary/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {problemStatement && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Problem Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{problemStatement}</p>
          </CardContent>
        </Card>
      )}

      {industry && industry.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {industry.map((ind) => (
                <Badge key={ind} variant="outline" className="bg-primary/10">
                  {ind}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {risks && risks.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-xl">Potential Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {risks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {relatedUrls && relatedUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Related Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {relatedUrls.map((url, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

