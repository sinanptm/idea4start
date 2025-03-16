import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, Reply } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface IdeaCommentsProps {
  ideaId: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function IdeaComments({ ideaId }: IdeaCommentsProps) {
  // Mock comments data
  const comments = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "This is a brilliant idea! I've been thinking about something similar for a while. Have you considered integrating with existing marketing platforms?",
      createdAt: new Date("2023-10-18T14:32:00"),
      likes: 5,
      replies: [
        {
          id: "1-1",
          user: {
            name: "Sarah Johnson",
            avatar: "/placeholder-user.jpg",
          },
          content:
            "Thanks for the feedback! Yes, I'm planning to integrate with popular marketing tools like Mailchimp and HubSpot in the MVP stage.",
          createdAt: new Date("2023-10-18T15:45:00"),
          likes: 2,
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "Have you done any market research on the target audience? I'd be interested to know what size of businesses you're targeting.",
      createdAt: new Date("2023-10-19T09:15:00"),
      likes: 3,
      replies: [],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Discussion ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea placeholder="Share your thoughts or ask a question..." />
            <Button>Post Comment</Button>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://avatar.vercel.sh/${comment.user.name}`} alt={comment.user.name} />
                  <AvatarFallback>
                    {comment.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{comment.user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                      <Reply className="h-4 w-4 mr-1" />
                      <span>Reply</span>
                    </Button>
                  </div>
                </div>
              </div>

              {comment.replies.length > 0 && (
                <div className="ml-14 space-y-4 pl-4 border-l-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://avatar.vercel.sh/${reply.user.name}`} alt={reply.user.name} />
                        <AvatarFallback>
                          {reply.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{reply.user.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </div>
                        </div>
                        <p className="mt-2">{reply.content}</p>
                        <div className="mt-3">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground">
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                            <span>{reply.likes}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

