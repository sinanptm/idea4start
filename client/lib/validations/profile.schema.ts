import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(1).max(100),
    designation: z.string().max(100).optional(),
    company: z.string().max(100).optional(),
    location: z.string().max(100).optional(),
    bio: z.string().max(1000).optional(),
    website: z.string().max(100).optional(),
    twitter: z.string().max(100).optional(),
    linkedin: z.string().max(100).optional(),
    github: z.string().max(100).optional(),
    phoneNumber: z.string().max(100).optional(),
    languages: z.array(z.string()).max(100).optional(),
    buyMeACoffee: z.string().max(100).optional(),
});


export type ProfileInput = z.infer<typeof profileSchema>;
export default profileSchema;
