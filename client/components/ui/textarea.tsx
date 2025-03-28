import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label";
import { ComponentProps, useId } from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}


const LabeledTextarea = ({ label, error, ...props }: { label: string; error?: string; } & ComponentProps<"textarea">) => {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} {...props} />
      {error && (
        <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}



export { Textarea, LabeledTextarea }
