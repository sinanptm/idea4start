import { Badge } from "@/components/ui/badge"
import type { Stage } from "@/types"
import { Lightbulb, Beaker, Rocket, Flag, BarChart } from "lucide-react"

interface StageBadgeProps {
  stage?: Stage
}

export default function StageBadge({ stage }: StageBadgeProps) {
  if (!stage) return null

  const stageConfig = {
    idea: {
      icon: Lightbulb,
      label: "Idea",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    validation: {
      icon: BarChart,
      label: "Validation",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    prototype: {
      icon: Beaker,
      label: "Prototype",
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
    mvp: {
      icon: Rocket,
      label: "MVP",
      color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    launched: {
      icon: Flag,
      label: "Launched",
      color: "bg-red-500/10 text-red-500 border-red-500/20",
    },
  }

  const config = stageConfig[stage]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={`${config.color} flex items-center gap-1 px-2 py-1`}>
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </Badge>
  )
}

