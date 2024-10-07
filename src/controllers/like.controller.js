import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


//TODO: toggle like on video
const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user.id; // Assuming you have user info in req.user

    // Check if the videoId is valid
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const existingLike = await Like.findOne({ videoId, userId });

    if (existingLike) {
        // If it exists, remove the like
        await Like.findOneAndDelete({ videoId, userId });
        return res.status(200).json(new ApiResponse({ message: "Like removed" }));
    } else {
        // Otherwise, add a new like
        const newLike = await Like.create({ videoId, userId });
        return res.status(201).json(new ApiResponse(newLike));
    }
});


//TODO: toggle like on comment
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id; // Assuming you have user info in req.user

    // Check if the commentId is valid
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const existingLike = await Like.findOne({ commentId, userId });

    if (existingLike) {
        await Like.findOneAndDelete({ commentId, userId });
        return res.status(200).json(new ApiResponse({ message: "Like removed" }));
    } else {
        const newLike = await Like.create({ commentId, userId });
        return res.status(201).json(new ApiResponse(newLike));
    }
});


//TODO: toggle like on tweet
const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user.id; // Assuming you have user info in req.user

    // Check if the tweetId is valid
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const existingLike = await Like.findOne({ tweetId, userId });

    if (existingLike) {
        await Like.findOneAndDelete({ tweetId, userId });
        return res.status(200).json(new ApiResponse({ message: "Like removed" }));
    } else {
        const newLike = await Like.create({ tweetId, userId });
        return res.status(201).json(new ApiResponse(newLike));
    }
});

//TODO: get all liked videos
const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user.id; // Assuming you have user info in req.user

    const likedVideos = await Like.find({ userId }).populate('videoId');

    if (!likedVideos || likedVideos.length === 0) {
        return res.status(404).json(new ApiResponse({ message: "No liked videos found" }));
    }

    res.status(200).json(new ApiResponse(likedVideos));
});


export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}