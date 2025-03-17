import connectDB from "@/lib/db/connect";
import Idea from "@/lib/db/models/Idea";
import { NextResponse } from "next/server";
import { StatusCode } from "@/types";
import { serializeData } from "@/lib/utils";
import { URLSearchParams } from "url";

connectDB();

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const { query, skip, limit, sortQuery, page } = createFilter(searchParams);

        const [ideas, totalCount] = await Promise.all([
            Idea.aggregate([
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
                { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
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
                { $sort: sortQuery },
                { $skip: skip },
                { $limit: limit }
            ]),
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

const createFilter = (searchParams: URLSearchParams) => {
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '7');
    const search = searchParams.get('search');
    const businessModel = searchParams.get('businessModel');
    const industry = searchParams.get('industry');
    const sort = searchParams.get('sort') || 'trending';
    const stage = searchParams.get('stage') || 'all';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
        isPublic: true
    };

    if (search && search.trim() !== '') {
        query.$or = [
            { title: { $regex: search.trim(), $options: 'i' } },
            { description: { $regex: search.trim(), $options: 'i' } }
        ];
    }

    if (businessModel && businessModel !== 'all' && businessModel !== 'null') {
        query.businessModel = businessModel;
    }

    if (industry && industry !== 'all' && industry !== 'null') {
        query.industry = industry;
    }

    if (stage && stage !== 'all' && stage !== 'null') {
        query.stage = stage;
    }

    const skip = (page - 1) * limit;

    let sortQuery = {};
    switch (sort) {
        case 'latest':
            sortQuery = { createdAt: -1 };
            break;
        case 'trending':
            sortQuery = { upVotes: -1, createdAt: -1 };
            break;
        case 'topvoted':
            sortQuery = { upVotes: -1 };
            break;
        default:
            sortQuery = { createdAt: -1 };
    }

    return {
        query,
        skip,
        sortQuery,
        limit,
        page
    };
};