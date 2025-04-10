import IIdea from "@/domain/entities/IIdea";
import IIdeaRepository from "@/domain/repositories/IIdeaRepository";
import IUserRepository from "@/domain/repositories/IUserRepository";
import { PipelineStage } from "mongoose";

type GetHomePageStaticsResponse = {
    totalUsers: number;
    totalIdeas: number;
    trendingIdeas: IIdea[];
};

export default class GetHomePageStaticsUseCase {
    constructor(
        private readonly ideaRepository: IIdeaRepository,
        private readonly userRepository: IUserRepository,
    ) { }

    async exec({ userId }: { userId: string | null; }): Promise<GetHomePageStaticsResponse> {
        const user = await this.userRepository.findById(userId!);
        userId = user ? user._id! : null;

        const pipeline: PipelineStage[] = [
            { $match: { isPublic: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'votes',
                    localField: '_id',
                    foreignField: 'ideaId',
                    as: 'votes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'ideaId',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    upVoteCount: {
                        $size: {
                            $filter: {
                                input: "$votes",
                                as: "vote",
                                cond: { $eq: ["$$vote.type", "up"] }
                            }
                        }
                    },
                    downVoteCount: {
                        $size: {
                            $filter: {
                                input: "$votes",
                                as: "vote",
                                cond: { $eq: ["$$vote.type", "down"] }
                            }
                        }
                    },
                    commentCount: { $size: "$comments" },
                    user: { $arrayElemAt: ["$user", 0] },
                    userLiked: {
                        $cond: {
                            if: userId,
                            then: {
                                $in: [userId, { $map: { input: "$votes", as: "vote", in: "$$vote.userId" } }]
                            },
                            else: false
                        }
                    }
                }
            },
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $addFields: {
                    trendingScore: {
                        $add: [
                            { $multiply: ["$upVoteCount", 2] },
                            { $multiply: ["$commentCount", 1.5] },
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            1,
                                            {
                                                $add: [
                                                    {
                                                        $divide: [
                                                            { $subtract: [new Date(), "$createdAt"] },
                                                            86400000
                                                        ]
                                                    },
                                                    1
                                                ]
                                            }
                                        ]
                                    },
                                    100
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    tags: 1,
                    stage: 1,
                    businessModel: 1,
                    createdAt: 1,
                    upVoteCount: 1,
                    downVoteCount: 1,
                    commentCount: 1,
                    trendingScore: 1,
                    userLiked: 1,
                    user: {
                        _id: 1,
                        name: 1,
                        image: 1
                    }
                }
            },
            { $sort: { trendingScore: -1 } },
            { $limit: 3 }
        ];

        const [totalUsers, totalIdeas, trendingIdeas] = await Promise.all([
            this.ideaRepository.countDocuments({}),
            this.userRepository.countDocuments(),
            this.ideaRepository.aggregate(pipeline)
        ]);

        return {
            totalUsers,
            totalIdeas,
            trendingIdeas
        };

    }
}


