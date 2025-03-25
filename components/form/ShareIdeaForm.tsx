"use client";

import { createIdeaSchema, type CreateIdeaInput } from "@/lib/validations/idea.schema";
import RelatedUrlSelector from "@/components/form/inputs/RelatedUrlSelector";
import IndustrySelector from "@/components/form/inputs/IndustrySelector";
import StageSelector from "@/components/form/inputs/StageSelector";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabeledInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HashIcon } from "lucide-react";
import { BusinessModel, InputName } from "@/types";
import SelectWithSearch from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createIdea } from "@/app/(server)/actions";
import { useToast } from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import TextAreaWithAiSuggestion from "@/components/TextAreaWithSuggestion";
import ButtonWithLoader from "../ButtonWithLoader";

const ShareIdeaForm = ({ onSuccess }: { onSuccess: () => void; }) => {
  const [tags, setTags] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    setError,
  } = useForm<CreateIdeaInput>({
    resolver: zodResolver(createIdeaSchema),
  });


  const onSubmit = async (data: CreateIdeaInput) => {
    try {
      const res = await createIdea(data);
      if (res.success) {
        toast({
          title: "Success",
          description: res.message,
        });
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to submit idea",
          variant: "destructive",
        });
      }
      onSuccess();
      reset();
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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

            <TextAreaWithAiSuggestion
              label="Title *"
              placeholder="Enter a catchy title for your idea"
              name="title"
              errors={errors}
              setError={(name, message) => setError(name as keyof CreateIdeaInput, { message })}
              onChange={(value) => setValue("title", value)}
              value={watch("title")}
              relativeFields={[
                { name: InputName.Description, value: watch("description") },
                { name: InputName.BusinessModel, value: watch("businessModel")?.[0] || "" },
                { name: InputName.Industries, value: watch("industries")?.[0] || "" },
                { name: InputName.Tags, value: watch("tags")?.join(",") || "" },
                { name: InputName.ProblemStatement, value: watch("problemStatement") },
                { name: InputName.UniqueValue, value: watch("uniqueValue")! },
                { name: InputName.Risks, value: watch("risks")! },
              ]}
            />

            <TextAreaWithAiSuggestion
              label="Description *"
              placeholder="Provide a brief overview of your startup idea..."
              name="description"
              onChange={(value) => setValue("description", value)}
              errors={errors}
              value={watch("description")}
              relativeFields={[
                { name: InputName.Title, value: watch("title") },
                { name: InputName.BusinessModel, value: watch("businessModel")?.[0] || "" },
                { name: InputName.Industries, value: watch("industries")?.[0] || "" },
                { name: InputName.Tags, value: watch("tags")?.join(",") || "" },
                { name: InputName.ProblemStatement, value: watch("problemStatement") },
                { name: InputName.UniqueValue, value: watch("uniqueValue")! },
                { name: InputName.Risks, value: watch("risks")! },
              ]}
            />

            <IndustrySelector
              onSelect={(industries) => setValue("industries", industries)}
              error={errors.industries?.message}
              defaultValue={watch("industries")}
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

            <TextAreaWithAiSuggestion
              label="Problem Statement *"
              placeholder="What specific problem does your startup solve? Who experiences this problem?"
              errors={errors}
              value={watch("problemStatement")}
              name="problemStatement"
              onChange={(value) => setValue("problemStatement", value)}
              relativeFields={[
                { name: InputName.Title, value: watch("title") },
                { name: InputName.Description, value: watch("description") },
                { name: InputName.BusinessModel, value: watch("businessModel")?.[0] || "" },
                { name: InputName.Industries, value: watch("industries")?.[0] || "" },
                { name: InputName.Tags, value: watch("tags")?.join(",") || "" },
                { name: InputName.UniqueValue, value: watch("uniqueValue")! },
                { name: InputName.Risks, value: watch("risks")! },
              ]}
            />

            <TextAreaWithAiSuggestion
              label="Unique Value Proposition *"
              placeholder="What makes your solution unique? Why would customers choose your solution over alternatives?"
              errors={errors}
              value={watch("uniqueValue")}
              name="uniqueValue"
              onChange={(value) => setValue("uniqueValue", value)}
              relativeFields={[
                { name: InputName.Title, value: watch("title") },
                { name: InputName.Description, value: watch("description") },
                { name: InputName.BusinessModel, value: watch("businessModel")?.[0] || "" },
                { name: InputName.Industries, value: watch("industries")?.[0] || "" },
                { name: InputName.Tags, value: watch("tags")?.join(",") || "" },
                { name: InputName.ProblemStatement, value: watch("problemStatement") },
                { name: InputName.Risks, value: watch("risks")! },
              ]}
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
              className="mb-12"
            />


            <TextAreaWithAiSuggestion
              label="Risks "
              placeholder="What are the risks associated with your startup idea? How can you mitigate them?"
              errors={errors}
              value={watch("risks")}
              name="risks"
              onChange={(value) => setValue("risks", value)}
              relativeFields={[
                { name: InputName.Title, value: watch("title") },
                { name: InputName.Description, value: watch("description") },
                { name: InputName.BusinessModel, value: watch("businessModel")?.[0] || "" },
                { name: InputName.Industries, value: watch("industries")?.[0] || "" },
                { name: InputName.Tags, value: watch("tags")?.join(",") || "" },
                { name: InputName.ProblemStatement, value: watch("problemStatement") },
                { name: InputName.UniqueValue, value: watch("uniqueValue")! },
              ]}
            />

            <StageSelector currentStage={watch("stage")} setValue={setValue} errors={errors} />
          </div>

          <div className="pt-4 sm:pt-6 flex justify-end">
            <ButtonWithLoader
              type="submit"
              variant={"outline"}
              className="bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Submit Idea
            </ButtonWithLoader>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(ShareIdeaForm);