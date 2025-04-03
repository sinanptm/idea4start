import IIdea from "@/domain/entities/IIdea";
import IIdeaRepository from "@/domain/repositories/IIdeaRepository";
import IVoteRepository from "@/domain/repositories/IVoteRepository";
import { PipelineStage } from "mongoose";

interface GetIdeasQuery {
    skip: number;
    limit: number;
    page: number;
    businessModel: string;
    industry: string;
    sort: string;
    stage: string;
    timePeriod: string;
    search: string;
}

export default class GetIdeasUseCase {
    constructor(
        private readonly ideaRepository: IIdeaRepository,
        private readonly voteRepository: IVoteRepository
    ) { }


    async exec(filters: GetIdeasQuery): Promise<{ ideas: IIdea[], pagination: { currentPage: number, totalPages: number, totalItems: number; }; }> {
        const { query, skip, limit, sortQuery, page, searchTerms } = this.createFilter(filters);
        const pipeline: PipelineStage[] = [
            { $match: query },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $addFields: {
                    userDetails: {
                        $cond: {
                            if: { $eq: [{ $size: "$userDetails" }, 0] },
                            then: [null],
                            else: "$userDetails"
                        }
                    }
                }
            },
            { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } }
        ];


        if (searchTerms && searchTerms.length > 0) {
            this.addSearchRelevanceScoring(pipeline, searchTerms);
        }


        pipeline.push(
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    isPublic: 1,
                    industry: 1,
                    tags: 1,
                    upVotes: 1,
                    downVotes: 1,
                    problemStatement: 1,
                    relatedUrls: 1,
                    stage: 1,
                    risks: 1,
                    businessModel: 1,
                    userBuyMeACoffeeUrl: 1,
                    relevanceScore: 1,
                    user: {
                        $cond: {
                            if: { $ne: ["$userDetails", null] },
                            then: {
                                _id: '$userDetails._id',
                                name: '$userDetails.name',
                                email: '$userDetails.email',
                                image: '$userDetails.image'
                            },
                            else: null
                        }
                    },
                    userId: { $ifNull: ['$userDetails._id', '$userId'] }
                }
            },
            //eslint-disable-next-line
            { $sort: sortQuery as any },
            { $skip: skip },
            { $limit: limit }
        );

        const [ideas, totalCount] = await Promise.all([
            this.ideaRepository.aggregate(pipeline),
            this.ideaRepository.countDocuments(query)
        ]);

        const ideasWithVotes = await Promise.all(ideas.map(async (idea) => {
            const [votes] = await Promise.all([
                this.voteRepository.findByIdeaId(idea._id),
            ]);
            return { ...idea, votes };
        }));



        return {
            ideas: ideasWithVotes,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalItems: totalCount
            },
        };
    }


    addSearchRelevanceScoring = (pipeline: PipelineStage[], searchTerms: string[]) => {
        const searchFields = ["title", "description", "tags", "problemStatement"];

        const textScoreExpressions = searchFields.flatMap(field =>
            searchTerms.map(term => ({
                $cond: {
                    if: { $regexMatch: { input: `$${field}`, regex: term, options: "i" } },
                    then: {
                        $cond: {
                            if: { $eq: [field, "title"] },
                            then: 5, // Title matches are weighted higher
                            else: {
                                $cond: {
                                    if: { $eq: [field, "tags"] },
                                    then: 3, // Tag matches are weighted medium
                                    else: 1 // Other fields get normal weight
                                }
                            }
                        }
                    },
                    else: 0
                }
            }))
        );

        pipeline.push({
            $addFields: {
                relevanceScore: {
                    $add: [
                        { $sum: textScoreExpressions },
                        { $divide: [{ $ifNull: ["$upVotes", 0] }, 10] }, // Factor in upvotes with lower weight
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
                                                        86400000 // Convert ms to days
                                                    ]
                                                },
                                                1
                                            ]
                                        }
                                    ]
                                },
                                100 // Scale factor for recency
                            ]
                        }
                    ]
                }
            }
        } as PipelineStage);
    };


    private createFilter({ businessModel, industry, stage, timePeriod, search, limit, page, sort }: GetIdeasQuery) {

        //eslint-disable-next-line
        const query: Record<string, any> = {
            isPublic: true
        };

        // Process search terms
        let searchTerms: string[] = [];
        if (search && search.trim() !== '') {
            const processedSearch = search.trim();
            searchTerms = processedSearch.split(/\s+/).filter(term => term.length > 2);

            query.$or = [
                { title: { $regex: processedSearch, $options: 'i' } },
                { description: { $regex: processedSearch, $options: 'i' } },
                { tags: { $in: searchTerms.map(term => new RegExp(term, 'i')) } }
            ];
        }

        // Apply filters for business model, industry, and stage
        if (businessModel && businessModel !== 'all' && businessModel !== 'null') {
            query.businessModel = businessModel;
        }

        if (industry && industry !== 'all' && industry !== 'null') {
            query.industry = industry;
        }

        if (stage && stage !== 'all' && stage !== 'null') {
            query.stage = stage;
        }

        // Apply time period filter
        if (timePeriod && timePeriod !== 'all') {
            const now = new Date();
            const startDate = new Date();

            switch (timePeriod) {
                case 'day':
                    startDate.setDate(now.getDate() - 1);
                    break;
                case 'week':
                    startDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    startDate.setMonth(now.getMonth() - 1);
                    break;
                case 'year':
                    startDate.setFullYear(now.getFullYear() - 1);
                    break;
            }

            query.createdAt = { $gte: startDate };
        }

        const skip = (page - 1) * limit;
        const sortQuery = this.buildSortQuery(sort, searchTerms);

        return {
            query,
            skip,
            sortQuery,
            limit,
            page,
            searchTerms
        };
    };

    private buildSortQuery(sort: string, searchTerms: string[]): Record<string, 1 | -1> {
        const sortQuery: Record<string, 1 | -1> = {};

        switch (sort) {
            case 'latest':
                sortQuery.createdAt = -1;
                break;
            case 'trending':
                // Trending combines recency and popularity
                sortQuery.upVotes = -1;
                sortQuery.createdAt = -1;
                break;
            case 'topvoted':
                sortQuery.upVotes = -1;
                break;
            case 'relevance':
                // If search terms exist, sort by relevance score
                // Otherwise, fall back to popularity and recency
                if (searchTerms.length > 0) {
                    //eslint-disable-next-line
                    (sortQuery as any).relevanceScore = -1;
                } else {
                    sortQuery.upVotes = -1;
                    sortQuery.createdAt = -1;
                }
                break;
            default:
                sortQuery.createdAt = -1;
        }

        return sortQuery;
    };
}