import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CreateIdeaInput } from "@/lib/validations/idea.schema";
import { StageConfig } from "@/types";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { memo } from "react";
import { STAGE_CONFIG } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";

interface StageSelectorProps {
  currentStage: StageConfig['value'];
  setValue: UseFormSetValue<CreateIdeaInput>;
  errors: FieldErrors<CreateIdeaInput>;
}

const StageSelector = ({ currentStage, setValue, errors }: StageSelectorProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-3 px-0 sm:px-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <Label className="text-base">Project Stage *</Label>
        <span className="text-xs text-muted-foreground">
          Select the current stage of your project
        </span>
      </div>

      <div className={cn(
        "grid gap-2 sm:gap-3",
        isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      )}>
        {STAGE_CONFIG.map(({ value, label, icon: Icon, description, color }) => {
          const isSelected = currentStage === value;
          
          return (
            <button
              key={value}
              type="button"
              onClick={() => setValue("stage", value)}
              className={cn(
                "group relative rounded-lg border-2 p-3 sm:p-4",
                "transition-all duration-200 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? cn("border-primary bg-primary/5", color)
                  : "border-muted bg-transparent hover:bg-accent/50",
                isMobile 
                  ? "flex flex-row items-center" 
                  : "flex flex-col items-center space-y-2"
              )}
            >
              <Icon className={cn(
                "transition-transform duration-200",
                isSelected ? color : "text-muted-foreground",
                "group-hover:scale-110",
                isMobile ? "h-5 w-5 mr-3" : "h-6 w-6"
              )} />
              
              <div className={cn(
                isMobile ? "text-left" : "text-center"
              )}>
                <p className={cn(
                  "text-sm font-medium transition-colors",
                  isSelected && "text-primary"
                )}>
                  {label}
                </p>
                {(!isMobile || isSelected) && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {description}
                  </p>
                )}
              </div>

              {isSelected && (
                <Badge 
                  variant="default" 
                  className={cn(
                    "absolute -top-2 -right-2 h-5 w-5 rounded-full p-0",
                    "flex items-center justify-center",
                    "animate-in zoom-in duration-200"
                  )}
                >
                  ✓
                </Badge>
              )}

              <div className={cn(
                "absolute inset-0 rounded-lg opacity-0 transition-opacity",
                "group-hover:opacity-100",
                "bg-gradient-to-b from-transparent to-accent/10"
              )} />
            </button>
          );
        })}
      </div>

      {errors.stage && (
        <p className="text-destructive text-xs sm:text-sm mt-2 animate-in slide-in-from-top-1">
          {errors.stage.message}
        </p>
      )}
    </div>
  );
};

export default memo(StageSelector);