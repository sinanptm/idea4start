"use client";

import type React from "react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import LogoIcon from "@/components/logo/LogoIcon";
import { LogOut } from "lucide-react";
import { ConfirmLogoutModalProps } from "@/types/props";

const ConfirmLogoutModal = ({ isOpen, setIsOpen }: ConfirmLogoutModalProps) => {
    const handleLogout = (e: React.MouseEvent) => {
        signOut();
        setIsOpen(false);
    };

    const handleCancel = (e: React.MouseEvent) => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[400px] p-6 bg-card border-gray-800">
                <DialogHeader className="space-y-4">
                    <div className="mx-auto">
                        <LogoIcon className="h-12 w-12" />
                    </div>
                    <div className="text-center space-y-2">
                        <DialogTitle className="text-xl font-semibold tracking-tight">
                            Confirm Logout
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Are you sure you want to sign out of your account?
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <DialogFooter className="mt-6 sm:mt-8">
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Button
                            variant="outline"
                            className="flex-1 h-11 bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="flex-1 h-11 transition-all gap-2"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            Confirm Logout
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default memo(ConfirmLogoutModal);

