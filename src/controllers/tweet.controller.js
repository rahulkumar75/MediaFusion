import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

//TODO: create tweet
const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id; // Assuming you have user info in req.user

    if (!content) {
        throw new ApiError(400, "Tweet content is required");
    }

    const newTweet = await Tweet.create({ content, userId });
    res.status(201).json(new ApiResponse(newTweet));
});

// TODO: get user tweets - This function retrieves all tweets made by a specific user.
const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const tweets = await Tweet.find({ userId }).sort({ createdAt: -1 });

    if (!tweets || tweets.length === 0) {
        return res.status(404).json(new ApiResponse({ message: "No tweets found for this user" }));
    }

    res.status(200).json(new ApiResponse(tweets));
});

    //TODO: update tweet
    const updateTweet = asyncHandler(async (req, res) => {
        const { tweetId } = req.params;
        const { content } = req.body;
    
        if (!isValidObjectId(tweetId)) {
            throw new ApiError(400, "Invalid tweet ID");
        }
    
        const updatedTweet = await Tweet.findByIdAndUpdate(
            tweetId,
            { content },
            { new: true }
        );
    
        if (!updatedTweet) {
            throw new ApiError(404, "Tweet not found");
        }
    
        res.status(200).json(new ApiResponse(updatedTweet));
    });
    

//TODO: delete tweet 
// This function allows a user to delete their tweet.
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

    if (!deletedTweet) {
        throw new ApiError(404, "Tweet not found");
    }

    res.status(200).json(new ApiResponse({ message: "Tweet deleted successfully" }));
});


export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}