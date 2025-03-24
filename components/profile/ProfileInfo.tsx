import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, Mail, MapPin, Phone, Building, User } from "lucide-react";
import { IUser } from "@/types/interface";

interface ProfileInfoProps {
    user: IUser;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
    const formatDate = (date: Date | undefined) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const socialLinks = [
        { name: "Website", value: user.website, icon: Globe, url: user.website },
        { name: "GitHub", value: user.github, icon: User, url: `https://github.com/${user.github}` },
        { name: "Twitter", value: user.twitter, icon: User, url: `https://twitter.com/${user.twitter}` },
        { name: "LinkedIn", value: user.linkedin, icon: User, url: `https://linkedin.com/in/${user.linkedin}` },
        {
            name: "Buy Me A Coffee",
            value: user.buyMeACoffee,
            icon: User,
            url: `https://buymeacoffee.com/${user.buyMeACoffee}`,
        },
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span className="font-medium text-foreground">Name:</span> {user.name}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium text-foreground">Email:</span> {user.email}
                    </div>
                    {user.designation && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span className="font-medium text-foreground">Designation:</span> {user.designation}
                        </div>
                    )}
                    {user.company && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Building className="h-4 w-4" />
                            <span className="font-medium text-foreground">Company:</span> {user.company}
                        </div>
                    )}
                    {user.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium text-foreground">Location:</span> {user.location}
                        </div>
                    )}
                    {user.phoneNumber && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span className="font-medium text-foreground">Phone:</span> {user.phoneNumber}
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium text-foreground">Member since:</span> {formatDate(user.createdAt)}
                    </div>
                </div>
            </div>

            {user.bio && (
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Bio</h3>
                    <p className="text-muted-foreground">{user.bio}</p>
                </div>
            )}

            {user.languages && user.languages.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Skills & Languages</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.languages.map((language, index) => (
                            <Badge key={index} variant="secondary" className="bg-sidebar">
                                {language}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialLinks.map((link, index) =>
                        link.value ? (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <link.icon className="h-4 w-4" />
                                <span className="font-medium">{link.name}:</span> {link.value}
                            </a>
                        ) : null,
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(ProfileInfo)

