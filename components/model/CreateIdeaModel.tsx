"use client";

import { memo, useState } from "react";
import { CreateIdeaModelProps } from "@/types/props";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIdeaSchema, type CreateIdeaInput } from "@/lib/validations/idea.schema";
import { LabeledInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IndustrySelector from '@/components/form/IndustrySelector';
import { LabeledTextarea } from "@/components/ui/textarea";
import { HashIcon } from "lucide-react";
import StageSelector from "@/components/form/StageSelector";
import RelatedUrlSelector from "@/components/form/RelatedUrlSelector";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateIdeaModel = ({ open, onOpenChange }: CreateIdeaModelProps) => {
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateIdeaInput>({
    resolver: zodResolver(createIdeaSchema),
  });

  const onSubmit = (data: CreateIdeaInput) => {
    console.log(data);
    // Handle form submission
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(',')) {
      const newTag = value.replace(',', '').trim();
      if (newTag && !tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        setValue("tags", newTags);
      }
      e.target.value = ''; // Clear input after adding tag
    }
  };

   return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold">Share Your Startup Idea</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <ScrollArea className="h-[500px] p-3 rounded-md border sm:px-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="sticky top-0 z-10 w-full grid grid-cols-2 mb-4  backdrop-blur-lg">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <div className="pb-6 ">
                <TabsContent value="basic" className="space-y-6 mt-0">
                  <LabeledInput
                    label="Title (required)"
                    placeholder="Enter a catchy title for your idea"
                    {...register("title")}
                    error={errors.title?.message}
                  />

                  <LabeledTextarea
                    label="Description (required)"
                    placeholder="Provide a brief overview of your startup idea..."
                    {...register("description")}
                    error={errors.description?.message}
                  />

                  <IndustrySelector
                    onSelect={(industries) => setValue('industries', industries)}
                    error={errors.industries?.message}
                  />

                  <div className="space-y-3">
                    <LabeledInput
                      label="Tags (required)"
                      placeholder="Add relevant tags , press comma to add"
                      onChange={handleTagInput}
                      error={errors.tags?.message}
                    />

                    {tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {tags.map(tag => (
                          <Button
                            key={tag}
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="gap-1.5 group hover:bg-destructive/10"
                            onClick={() => {
                              const newTags = tags.filter(t => t !== tag);
                              setTags(newTags);
                              setValue("tags", newTags);
                            }}
                          >
                            <HashIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            {tag}
                            <span className="text-muted-foreground/60 group-hover:text-destructive">×</span>
                          </Button>
                        ))}
                      </div>
                    )}

                    {tags.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {tags.length} tag{tags.length > 1 ? 's' : ''} added
                      </p>
                    )}
                  </div>

                  <LabeledInput
                    label="Email (optional)"
                    placeholder="johnwick@gmail.com"
                    type="email"
                    {...register("userEmail")}
                    error={errors.userEmail?.message}
                  />
                  
                  <LabeledInput
                    label="Name (optional)"
                    placeholder="John Wick"
                    {...register("userName")}
                    error={errors.userName?.message}
                  />
                  
                  <LabeledInput
                    label="Your Buy Me a Coffee URL (optional)"
                    placeholder="https://www.buymeacoffee.com/johnwick"
                    {...register("userBuyMeACoffeeUrl")}
                    error={errors.userBuyMeACoffeeUrl?.message}
                  />
                </TabsContent>

                <TabsContent value="details" className="space-y-6">
                  <LabeledTextarea
                    label="Problem Statement (required)"
                    placeholder="What specific problem does your startup solve? Who experiences this problem?"
                    {...register("problemStatement")}
                    error={errors.problemStatement?.message}
                  />

                  <LabeledTextarea
                    label="Unique Value Proposition (optional)"
                    placeholder="What makes your solution unique? Why would customers choose your solution over alternatives?"
                    {...register("uniqueValue")}
                    error={errors.uniqueValue?.message}
                  />

                  <RelatedUrlSelector
                    onSelect={(urls) => setValue("relatedUrls", urls)}
                    error={errors.relatedUrls?.message}
                    defaultValue={watch("relatedUrls")}
                  />
                

                  <StageSelector
                    currentStage={watch('stage')}
                    setValue={setValue}
                    errors={errors}
                  />

                  <LabeledTextarea
                    label="Risks (optional)"
                    placeholder="What are the risks associated with your startup idea? How can you mitigate them?"
                    {...register("risks")}
                    error={errors.risks?.message}
                  />
                  
                </TabsContent>
              </div>
            </Tabs>
          </ScrollArea>

          <div className="flex justify-end gap-2 p-4 border-t bg-muted/10">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Idea</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateIdeaModel);