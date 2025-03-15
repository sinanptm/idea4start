"use client";

import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIdeaSchema, type CreateIdeaInput } from "@/lib/validations/idea.schema";
import { LabeledInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import IndustrySelector from "@/components/form/IndustrySelector";
import { LabeledTextarea } from "@/components/ui/textarea";
import { HashIcon } from "lucide-react";
import StageSelector from "@/components/form/StageSelector";
import RelatedUrlSelector from "@/components/form/RelatedUrlSelector";
import { BusinessModel } from "@/types";
import SelectWithSearch from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createIdea } from "@/actions";
import { useToast } from "@/hooks/useToast";

const ShareIdeaForm = ({ onSuccess }: { onSuccess: () => void; }) => {
  const [tags, setTags] = useState<string[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<CreateIdeaInput>({
    resolver: zodResolver(createIdeaSchema),
  });

  const onSubmit = async (data: CreateIdeaInput) => {
    try {
      await createIdea(data);
      onSuccess();
      reset();
      toast({
        title: "Success",
        description: "Idea submitted successfully",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit idea",
        variant: "destructive",
      });
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newTag = value.replace(",", "").trim();
      if (newTag && !tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        setValue("tags", newTags);
      }
      e.target.value = "";
    }
  };

  return (
    <Card className="border-none">
      <CardContent className="p-3 sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-200">Basic Information</h3>
            <LabeledInput
              label="Title *"
              placeholder="Enter a catchy title for your idea"
              {...register("title")}
              error={errors.title?.message}
              className="text-sm sm:text-base"
            />

            <LabeledTextarea
              label="Description *"
              placeholder="Provide a brief overview of your startup idea..."
              {...register("description")}
              error={errors.description?.message}
              className="text-sm sm:text-base min-h-[100px] sm:min-h-16"
            />

            <IndustrySelector
              onSelect={(industries) => setValue("industries", industries)}
              error={errors.industries?.message}
            />

            <div className="space-y-2 sm:space-y-3">
              <LabeledInput
                label="Tags *"
                placeholder="Add relevant tags, press comma to add"
                onChange={handleTagInput}
                error={errors.tags?.message}
                className="bg-gray-950 border-gray-800 text-sm sm:text-base"
              />

              {tags.length > 0 && (
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {tags.map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="gap-1 sm:gap-1.5 group bg-gray-800 hover:bg-gray-700 text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-2.5"
                      onClick={() => {
                        const newTags = tags.filter((t) => t !== tag);
                        setTags(newTags);
                        setValue("tags", newTags);
                      }}
                    >
                      <HashIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400" />
                      {tag}
                      <span className="text-gray-500 group-hover:text-red-400">×</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
              <LabeledInput
                label="Email "
                placeholder="johnwick@gmail.com"
                type="email"
                {...register("userEmail")}
                error={errors.userEmail?.message}
                className="bg-gray-950 border-gray-800 text-sm sm:text-base"
              />

              <LabeledInput
                label="Name "
                placeholder="John Wick"
                {...register("userName")}
                error={errors.userName?.message}
                className="bg-gray-950 border-gray-800 text-sm sm:text-base"
              />
            </div>

            <LabeledInput
              label="Your Buy Me a Coffee URL "
              placeholder="https://www.buymeacoffee.com/johnwick"
              {...register("userBuyMeACoffeeUrl")}
              error={errors.userBuyMeACoffeeUrl?.message}
              className="bg-gray-950 border-gray-800 text-sm sm:text-base"
            />
          </div>

          <Separator className="border-gray-800" />

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-200">Detailed Information</h3>

            <LabeledTextarea
              label="Problem Statement *"
              placeholder="What specific problem does your startup solve? Who experiences this problem?"
              {...register("problemStatement")}
              error={errors.problemStatement?.message}
              className="bg-gray-950 border-gray-800 text-sm sm:text-base min-h-[100px] sm:min-h-16"
            />

            <LabeledTextarea
              label="Unique Value Proposition *"
              placeholder="What makes your solution unique? Why would customers choose your solution over alternatives?"
              {...register("uniqueValue")}
              error={errors.uniqueValue?.message}
              className="bg-gray-950 border-gray-800 text-sm sm:text-base min-h-[100px] sm:min-h-16"
            />

            <RelatedUrlSelector
              onSelect={(urls) => setValue("relatedUrls", urls)}
              error={errors.relatedUrls?.message}
              defaultValue={watch("relatedUrls")}
            />

            <SelectWithSearch
              options={Object.values(BusinessModel).map((model) => ({
                value: model,
                label: model,
              }))}
              value={watch("businessModel")?.[0] || ""}
              label="Business Model *"
              onChange={(value) => setValue("businessModel", [value])}
              error={errors.businessModel?.message}
            />

            <LabeledTextarea
              label="Risks "
              placeholder="What are the risks associated with your startup idea? How can you mitigate them?"
              {...register("risks")}
              error={errors.risks?.message}
              className="bg-gray-950 border-gray-800 text-sm sm:text-base min-h-[100px] sm:min-h-16"
            />

            <StageSelector currentStage={watch("stage")} setValue={setValue} errors={errors} />
          </div>

          <div className="pt-4 sm:pt-6 flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-8 text-sm sm:text-base w-full sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Idea"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(ShareIdeaForm);