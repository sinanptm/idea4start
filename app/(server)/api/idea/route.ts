import connectDB from "@/lib/db/connect";
import Idea from "@/lib/db/models/Idea";
import { NextResponse } from "next/server";
import { StatusCode } from "@/types";
import { serializeData } from "@/lib/utils";
import { PipelineStage } from "mongoose";

// Initialize DB connection
connectDB();

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const { query, skip, limit, sortQuery, page, searchTerms } = createFilter(searchParams);

        // Define base aggregation pipeline
        const pipeline: PipelineStage[] = [
            { $match: query },
            // Join with users collection
            {
                $lookup: {
                    from: 'users', 
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            // Handle cases with no user details
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

        // Add search relevance scoring if search terms exist
        if (searchTerms && searchTerms.length > 0) {
            addSearchRelevanceScoring(pipeline, searchTerms);
        }

        // Projection, sorting, pagination
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

        // Run queries in parallel for better performance
        const [ideas, totalCount] = await Promise.all([
            Idea.aggregate(pipeline),
            Idea.countDocuments(query)
        ]);

        return NextResponse.json({
            ideas: serializeData(ideas),
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalItems: totalCount
            },
            status: StatusCode.Ok,
        });
    } catch (error) {
        console.error('Error fetching ideas:', error);
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch ideas",
            status: StatusCode.InternalServerError
        });
    }
};

/**
 * Adds search relevance scoring to the pipeline
 */
const addSearchRelevanceScoring = (pipeline: PipelineStage[], searchTerms: string[]) => {
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


const createFilter = (searchParams: URLSearchParams) => {
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '7');
    const search = searchParams.get('search');
    const businessModel = searchParams.get('businessModel');
    const industry = searchParams.get('industry');
    const sort = searchParams.get('sort') || 'relevance';
    const stage = searchParams.get('stage') || 'all';
    const timePeriod = searchParams.get('timePeriod') || 'all';

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
    const sortQuery = buildSortQuery(sort, searchTerms);

    return {
        query,
        skip,
        sortQuery,
        limit,
        page,
        searchTerms
    };
};

const buildSortQuery = (sort: string, searchTerms: string[]): Record<string, 1 | -1> => {
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