import Idea from "@/lib/db/models/Idea";
import User from "@/lib/db/models/User";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import { serializeData } from "@/lib/utils";
import { withErrorHandler } from "@/lib/utils";
import validateSessionData from "@/lib/validateSessionData";
import { StatusCode } from "@/types";

connectDB();

export const GET = withErrorHandler(async () => {
     const { user } = await validateSessionData();

     const userId = user ? user._id : null;

     const [totalUsers, totalIdeas, trendingIdeas] = await Promise.all([
          User.countDocuments(),
          Idea.countDocuments(),
          Idea.aggregate([
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
          ])
     ]);

     return NextResponse.json({
          totalUsers,
          totalIdeas,
          trendingIdeas: serializeData(trendingIdeas),
          status: StatusCode.Ok,
     });
});