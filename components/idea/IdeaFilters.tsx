'use client'

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function IdeasFilters() {
  const businessModels = [
    { id: "saas", label: "SaaS" },
    { id: "marketplace", label: "Marketplace" },
    { id: "subscription", label: "Subscription" },
    { id: "freemium", label: "Freemium" },
    { id: "adModel", label: "Ad Model" },
  ]

  const industries = [
    { id: "tech", label: "Technology" },
    { id: "health", label: "Health & Wellness" },
    { id: "finance", label: "Finance" },
    { id: "education", label: "Education" },
    { id: "ecommerce", label: "E-commerce" },
  ]

  return (
    <div className="bg-card rounded-lg border p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Search</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search ideas..." className="pl-8" />
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["business-model", "industry"]}>
        <AccordionItem value="business-model">
          <AccordionTrigger className="text-sm font-medium">Business Model</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {businessModels.map((model) => (
                <div key={model.id} className="flex items-center space-x-2">
                  <Checkbox id={`model-${model.id}`} />
                  <label
                    htmlFor={`model-${model.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {model.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="industry">
          <AccordionTrigger className="text-sm font-medium">Industry</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {industries.map((industry) => (
                <div key={industry.id} className="flex items-center space-x-2">
                  <Checkbox id={`industry-${industry.id}`} />
                  <label
                    htmlFor={`industry-${industry.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {industry.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span>Reset Filters</span>
      </Button>
    </div>
  )
}

