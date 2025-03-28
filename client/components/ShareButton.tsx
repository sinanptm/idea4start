"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Copy, Twitter, Facebook, Linkedin, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/useToast";
import {
    PhoneIcon as WhatsappIcon,
    InstagramIcon,
    SignalIcon as TelegramIcon,
    RedoDotIcon as RedditIcon,
} from "lucide-react";
import { ShareIdeaButtonProps } from "@/types/props";
import { cn } from "@/lib/utils";

const ShareIdeaButton = ({ link, title = "Check this out!", className }: ShareIdeaButtonProps) => {
    const [copied, setCopied] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);


    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(link!);
            setCopied(true);
            toast({
                title: "Link copied",
                description: "The link has been copied to your clipboard",
            });
            setTimeout(() => setCopied(false), 2000);
            //eslint-disable-next-line
        } catch (err) {
            toast({
                title: "Failed to copy",
                description: "Could not copy the link to clipboard",
                variant: "destructive",
            });
        }
    };

    const handleShare = (platform: string) => {
        let shareUrl = "";
        const encodedUrl = encodeURIComponent(link!);
        const encodedTitle = encodeURIComponent(title);

        switch (platform) {
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case "email":
                shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
                break;
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
                break;
            case "telegram":
                shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case "reddit":
                shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
                break;
            case "instagram":
                shareUrl = `https://www.instagram.com/`;
                toast({
                    title: "Instagram sharing",
                    description: "Instagram doesn't support direct link sharing. Copy the link and share manually.",
                });
                break;
            default:
                if (navigator.share) {
                    navigator
                        .share({
                            title,
                            url: link,
                        })
                        .catch(console.error);
                    return;
                }
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
        }

        setIsOpen(false);
    };


    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const SocialButton = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void; }) => {
        return (
            <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-auto py-3 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border-none"
                onClick={onClick}
            >
                <div className="mb-1">{icon}</div>
                <span className="text-xs font-normal truncate w-full text-center">{label}</span>
            </Button>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsOpen(true)}
                    className={cn(" hover:bg-zinc-800", className)}
                >
                    <Share2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="w-[95vw] max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl bg-zinc-900 border-zinc-800 p-0 shadow-lg"
                ref={popoverRef}
            >
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-800">
                    <DialogTitle className="text-base sm:text-lg">Share</DialogTitle>
                </div>
                <div className="p-4 sm:p-6">
                    <h4 className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">Social Media</h4>
                    <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 md:grid-cols-5 lg:grid-cols-8">
                        <SocialButton
                            icon={<Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />}
                            label="Twitter"
                            onClick={() => handleShare("twitter")}
                        />
                        <SocialButton
                            icon={<Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
                            label="Facebook"
                            onClick={() => handleShare("facebook")}
                        />
                        <SocialButton
                            icon={<Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />}
                            label="LinkedIn"
                            onClick={() => handleShare("linkedin")}
                        />
                        <SocialButton
                            icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400" />}
                            label="Email"
                            onClick={() => handleShare("email")}
                        />
                        <SocialButton
                            icon={<WhatsappIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />}
                            label="WhatsApp"
                            onClick={() => handleShare("whatsapp")}
                        />
                        <SocialButton
                            icon={<InstagramIcon className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />}
                            label="Instagram"
                            onClick={() => handleShare("instagram")}
                        />
                        <SocialButton
                            icon={<TelegramIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />}
                            label="Telegram"
                            onClick={() => handleShare("telegram")}
                        />
                        <SocialButton
                            icon={<RedditIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />}
                            label="Reddit"
                            onClick={() => handleShare("reddit")}
                        />
                    </div>

                    <h4 className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">Copy Link</h4>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-6">
                        <div className="w-full sm:flex-1 bg-zinc-800 rounded-md px-3 py-2 text-xs sm:text-sm truncate">{link}</div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto h-8 sm:h-9 rounded-md bg-zinc-800 hover:bg-zinc-700 border-none"
                            onClick={handleCopyLink}
                        >
                            {copied ? (
                                <span className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500 mr-1" /> Copied
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <Copy className="h-4 w-4 mr-1" /> Copy Link
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareIdeaButton

