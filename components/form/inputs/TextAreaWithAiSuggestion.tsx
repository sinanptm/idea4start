import { Label } from '@radix-ui/react-label';
import { FieldValues, FieldErrors } from 'react-hook-form';
import { useId, useState, useCallback } from 'react';
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Check, X, AlertTriangle } from 'lucide-react';

type TextAreaWithAiSuggestionProps = {
    errors: FieldErrors<FieldValues>;
    label: string;
    name: string;
    placeholder: string;
    apiCall: (value: string, inputName: string) => Promise<{ data: string; }>;
    onChange?: (value: string) => void;
    value?: string;
    setError?: (name: string, message: string | undefined) => void;
    disabled?: boolean;
    className?: string;
};

const TextAreaWithAiSuggestion = ({
    errors,
    label,
    name,
    placeholder,
    apiCall,
    onChange,
    value = '',
    setError,
    disabled = false,
    className,
    ...props
}: TextAreaWithAiSuggestionProps) => {
    const id = useId();
    const [originalText, setOriginalText] = useState(value);
    const [showingSuggestion, setShowingSuggestion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handle getting AI suggestion
    const handleGetSuggestion = async () => {
        setIsLoading(true);
        setErrorMessage(null);
        setError?.(name, undefined);

        if (!value?.trim()) {
            const message = "This field is required";
            setError?.(name, message);
            setErrorMessage(message);
            setIsLoading(false);
            return;
        }

        try {
            if (!showingSuggestion) {
                setOriginalText(value);
                const result = await apiCall(value, name);

                if (result?.data) {
                    onChange?.(result.data);
                    setShowingSuggestion(true);
                } else {
                    throw new Error("No suggestion received");
                }
            }
        } catch (error) {
            console.error("Error getting AI suggestion:", error);
            const message = "Failed to get suggestion. Please try again.";
            setError?.(name, message);
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle accepting the suggestion
    const handleAcceptSuggestion = useCallback(() => {
        onChange?.(value);
        setShowingSuggestion(false);
    }, [onChange, value]);

    // Handle rejecting the suggestion
    const handleRejectSuggestion = useCallback(() => {
        onChange?.(originalText);
        setShowingSuggestion(false);
    }, [onChange, originalText]);

    // Determine if there's an error to display
    const errorToShow = errorMessage || (errors[name]?.message as string);

    return (
        <div className="*:not-first:mt-2 relative">
            <div className="flex justify-between items-center">
                <Label htmlFor={id}>{label}</Label>
                <div className="flex items-center gap-2">
                    {showingSuggestion && (
                        <>
                            <button
                                type="button"
                                onClick={handleAcceptSuggestion}
                                className="flex items-center gap-1 text-xs text-green-500 hover:text-green-400"
                                aria-label="Accept suggestion"
                                disabled={disabled}
                            >
                                <Check aria-hidden="true" size={16} />
                                Accept
                            </button>
                            <button
                                type="button"
                                onClick={handleRejectSuggestion}
                                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400"
                                aria-label="Reject suggestion"
                                disabled={disabled}
                            >
                                <X aria-hidden="true" size={16} />
                                Reject
                            </button>
                        </>
                    )}
                    <button
                        type="button"
                        onClick={handleGetSuggestion}
                        className={cn(
                            "text-gray-400 hover:text-gray-300 transition-colors",
                            isLoading && "animate-pulse text-blue-400",
                            showingSuggestion && "text-blue-400",
                            disabled && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={isLoading || disabled}
                        aria-label="Get AI suggestion"
                        title="Get AI suggestion"
                        aria-busy={isLoading}
                    >
                        <Sparkles aria-hidden="true" size={18} />
                    </button>
                </div>
            </div>
            <textarea
                data-slot="textarea"
                placeholder={placeholder}
                className={cn(
                    "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "bg-gray-950 border-gray-800 text-sm sm:text-base min-h-[100px] sm:min-h-16",
                    showingSuggestion && "border-blue-500/50",
                    errorToShow && "border-red-500",
                    className
                )}
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                {...props}
            />
            {errorToShow && (
                <p
                    className="text-destructive mt-2 text-xs flex items-center gap-1"
                    role="alert"
                    aria-live="polite"
                >
                    <AlertTriangle size={12} />
                    {errorToShow}
                </p>
            )}
            {isLoading && (
                <div className="absolute bottom-1 right-3 text-xs text-blue-400">
                    Generating suggestion...
                </div>
            )}
        </div>
    );
};

export default memo(TextAreaWithAiSuggestion);