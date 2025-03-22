'use client';

import { Label } from '@radix-ui/react-label';
import { useId, useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Check, X, AlertTriangle, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/useToast';
import useGetSuggestion from '@/hooks/api/useGetSuggestion';
import { InputName } from '@/types';
import { TextAreaWithSuggestionProps } from '@/types/props';

const TextAreaWithSuggestion = ({
    errors,
    label,
    name,
    placeholder,
    onChange,
    value = '',
    setError,
    disabled = false,
    className,
    relativeFields,
    ...props
}: TextAreaWithSuggestionProps) => {
    const id = useId();
    const { data: session } = useSession();
    const [originalText, setOriginalText] = useState(value);
    const [showingSuggestion, setShowingSuggestion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { mutate: getSuggestion, isPending: isSuggestionLoading } = useGetSuggestion();

    // Handle getting AI suggestion
    const handleGetSuggestion = async () => {
        if (!session) {
            toast({
                title: "Error 🚫",
                description: "You must be logged in to get AI suggestion 🔒",
                variant: "destructive",
            });
            return;
        }

        if (!value?.trim()) {
            const message = "Please enter some text to get a suggestion";
            setError?.(name, message);
            setErrorMessage(message);
            toast({
                title: "Error 🚫",
                description: message,
                variant: "destructive",
            });
            return;
        }

        try {
            if (!showingSuggestion) {
                setOriginalText(value);
                setIsLoading(true);
                setErrorMessage(null);
                setError?.(name, undefined);

                getSuggestion(
                    { value, inputName: name as InputName, relativeFields },
                    {
                        onSuccess: (data) => {
                            onChange?.(data);
                            setShowingSuggestion(true);
                        },
                        onError: (error) => {
                            console.error("Error getting AI suggestion:", error);
                            setError?.(name, "Failed to get suggestion. Please try again.");
                            setErrorMessage("Failed to get suggestion. Please try again.");
                            toast({
                                title: "Error 🚫",
                                description: "Failed to get suggestion. Please try again. 🔄",
                                variant: "destructive",
                            });
                        },
                        onSettled: () => {
                            setIsLoading(false);
                        }
                    }
                );
            }
        } catch (error) {
            console.error("Error getting AI suggestion:", error);
            setError?.(name, "Failed to get suggestion. Please try again.");
            setErrorMessage("Failed to get suggestion. Please try again.");
            toast({
                title: "Error 🚫",
                description: "Failed to get suggestion. Please try again. 🔄",
                variant: "destructive",
            });
            setIsLoading(false);
        }
    };

    const handleAcceptSuggestion = useCallback(() => {
        onChange?.(value);
        setShowingSuggestion(false);
    }, [onChange, value]);

    const handleRejectSuggestion = useCallback(() => {
        onChange?.(originalText);
        setShowingSuggestion(false);
    }, [onChange, originalText]);

    const errorToShow = errorMessage || (errors[name]?.message as string);
    const isDisabled = disabled || isLoading || isSuggestionLoading;

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
                                className="flex items-center gap-1 text-xs text-green-500 hover:text-green-400 transition-colors"
                                aria-label="Accept suggestion"
                                disabled={isDisabled}
                            >
                                <Check aria-hidden="true" size={16} />
                                Accept
                            </button>
                            <button
                                type="button"
                                onClick={handleRejectSuggestion}
                                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400 transition-colors"
                                aria-label="Reject suggestion"
                                disabled={isDisabled}
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
                            "text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1",
                            showingSuggestion && "text-blue-400",
                            isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={isDisabled}
                        aria-label="Get AI suggestion"
                        title="Get AI suggestion"
                    >
                        {isLoading || isSuggestionLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles aria-hidden="true" size={18} />
                        )}
                    </button>
                </div>
            </div>
            <textarea
                data-slot="textarea"
                placeholder={placeholder}
                className={cn(
                    "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "bg-gray-950 border-gray-800 text-sm sm:text-base min-h-[100px] sm:min-h-16",
                    showingSuggestion && "border-blue-500/50",
                    errorToShow && "border-red-500",
                    (isLoading || isSuggestionLoading) && "opacity-70",
                    className
                )}
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={isDisabled}
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
            {(isLoading || isSuggestionLoading) && (
                <div className="absolute bottom-2 right-3 text-xs text-blue-400 flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Generating suggestion...
                </div>
            )}
        </div>
    );
};

export default memo(TextAreaWithSuggestion);