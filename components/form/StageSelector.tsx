import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CreateIdeaInput } from "@/lib/validations/idea.schema";
import { StageConfig } from "@/types";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { memo } from "react";
import { STAGE_CONFIG } from "@/constants";

interface StageSelectorProps {
  currentStage: StageConfig['value'];
  setValue: UseFormSetValue<CreateIdeaInput>;
  errors: FieldErrors<CreateIdeaInput>;
}

const StageSelector = ({ currentStage, setValue, errors }: StageSelectorProps) => {
  return (
    <div className="space-y-3 px-2">
      <div className="flex items-center justify-between">
        <Label className="text-base">Project Stage (required)</Label>
        <span className="text-xs text-muted-foreground">
          Select the current stage of your project
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {STAGE_CONFIG.map(({ value, label, icon: Icon, description, color }) => {
          const isSelected = currentStage === value;
          
          return (
            <button
              key={value}
              type="button"
              onClick={() => setValue("stage", value)}
              className={cn(
                "group relative flex flex-col items-center space-y-2 rounded-lg border-2 p-4",
                "transition-all duration-200 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? cn("border-primary bg-primary/5", color)
                  : "border-muted bg-transparent hover:bg-accent/50"
              )}
            >
              <Icon className={cn(
                "h-6 w-6 transition-transform duration-200",
                isSelected ? color : "text-muted-foreground",
                "group-hover:scale-110"
              )} />
              
              <div className="text-center">
                <p className={cn(
                  "text-sm font-medium transition-colors",
                  isSelected && "text-primary"
                )}>
                  {label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {description}
                </p>
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
        <p className="text-destructive text-sm mt-2 animate-in slide-in-from-top-1">
          {errors.stage.message}
        </p>
      )}
    </div>
  );
};

export default memo(StageSelector);