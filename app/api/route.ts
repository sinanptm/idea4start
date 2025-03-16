import connectDB from "@/lib/db/connect";
import Idea from "@/lib/db/models/Idea";
import { NextResponse } from "next/server";
import { StatusCode } from "@/types";
import { serializeData } from "@/lib/utils";

connectDB();

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);

        // Get all query parameters
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '7');
        const search = searchParams.get('search');
        const businessModel = searchParams.get('businessModel');
        const industry = searchParams.get('industry');
        const sort = searchParams.get('sort') || 'trending';
        const stage = searchParams.get('stage') || 'all';

        // Build query
        const query: any = {
            isPublic: true
        };

        // Add filters if they exist
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

        console.log('Final query:', JSON.stringify(query, null, 2)); // Debug log

        // Calculate skip for pagination
        const skip = (page - 1) * limit;

        // Build sort object
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

        console.log('Sort query:', JSON.stringify(sortQuery, null, 2)); // Debug log

        // Execute query with pagination
        const [ideas, totalCount] = await Promise.all([
            Idea.find(query)
                .sort(sortQuery)
                .skip(skip)
                .limit(limit)
                .lean(),
            Idea.countDocuments(query)
        ]);

        // Calculate pagination info
        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            ideas: serializeData(ideas),
            pagination: {
                currentPage: page,
                totalPages,
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
