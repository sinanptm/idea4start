import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonWithLoaderProps } from "@/types/props";

const ButtonWithLoader = ({ children, isLoading, ...props }: ButtonWithLoaderProps) => {
    return (
        <Button {...props}>
            {isLoading ?
                <Loader2
                    className="w-4 h-4 animate-spin"
                    aria-label="Loading..."
                    aria-hidden="true"
                    size={16}
                />
                : children
            }
        </Button>
    );
};

export default ButtonWithLoader;    