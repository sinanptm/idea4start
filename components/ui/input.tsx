import { cn } from "@/lib/utils";
import { ComponentProps, useId } from "react";
import { Label } from "./label";
import { ArrowRightIcon, SearchIcon } from "lucide-react";

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}


const LabeledInput = ({ label, error, ...props }: { label: string; error?: string; } & ComponentProps<"input">) => {
  const id = useId();
  return (
    <>
      <div className="[--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...props} />
        {error && (
          <p
            className="peer-aria-invalid:text-destructive mt-2 text-xs"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    </>
  );
}


const SearchInput = ({ 
  placeholder = "Search...", 
  onSearch,
  onInputChange,
  defaultValue = "", 
  error, 
  disabled,
  className,
  label,
  value,
  suggestions = [],
  onSuggestionClick,
  ...props
}: SearchInputProps) => {
  const id = useId();

  return (
    <div className="*:not-first:mt-2 relative">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input 
          id={id} 
          className={cn(
            "peer ps-9 pe-9",
            error ? 'border-red-500 focus-visible:ring-red-300' : '',
            className
          )}
          placeholder={placeholder} 
          type="search"
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onInputChange?.(e.target.value)}
          {...props}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="button"
          disabled={disabled}
          onClick={() => value && onSearch?.(value as string)}
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className={cn(
                  "px-3 py-2 text-sm cursor-pointer",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground",
                  "outline-none"
                )}
                onClick={() => onSuggestionClick?.(suggestion)}
                role="option"
                tabIndex={0}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p 
          id={`${id}-error`} 
          className="text-sm text-red-500 mt-1"
        >
          {error}
        </p>
      )}
    </div>
  );
}




export { Input, LabeledInput, SearchInput };

interface SearchInputProps extends Omit<ComponentProps<"input">, "onSearch"> {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onInputChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}