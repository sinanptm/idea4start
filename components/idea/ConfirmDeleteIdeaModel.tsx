import { toast } from "@/hooks/useToast";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "../ui/dialog";
import { Trash } from "lucide-react";
import useDeleteIdea from "@/hooks/api/useDeleteIdea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { ConfirmDeleteIdeaModelProps } from "@/types/props";

const ConfirmDeleteIdeaModel = ({ idea }: ConfirmDeleteIdeaModelProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { mutate: deleteIdea, isPending: isDeleting } = useDeleteIdea();

    const handleDelete = () => {
        deleteIdea(idea._id, {
            onSuccess: () => {
                toast({
                    title: "Idea deleted successfully",
                    variant: "success",
                });
                setOpen(false);
                router.push("/ideas");
            },
            onError: () => {
                toast({
                    title: "Failed to delete idea",
                    description: "Please try again",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <>
            <DropdownMenuItem
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(true);
                }}
                className="cursor-pointer text-red-500 hover:bg-muted gap-2 text-sm"
            >
                <Trash className="h-4 w-4" /> Delete
            </DropdownMenuItem>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Idea</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this idea? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ConfirmDeleteIdeaModel;