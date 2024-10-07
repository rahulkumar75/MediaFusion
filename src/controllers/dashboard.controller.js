import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

// TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
const getChannelStats = asyncHandler(async (req, res) => {
    
  
        const { channelId } = req.params; // Assuming the channelId is passed as a route parameter
    
        // 1. Total videos uploaded by the channel
        const totalVideos = await Video.countDocuments({ channelId });
    
        // 2. Total likes on all videos uploaded by the channel
        const totalLikes = await Like.countDocuments({ videoChannelId: channelId });
    
        // 3. Total views on all videos
        const totalViews = await Video.aggregate([
            { $match: { channelId: mongoose.Types.ObjectId(channelId) } },
            { $group: { _id: null, totalViews: { $sum: "$views" } } }
        ]);
    
        // 4. Total subscribers to the channel
        const totalSubscribers = await Subscription.countDocuments({ channelId });
    
        res.status(200).json(new ApiResponse({
            totalVideos,
            totalLikes,
            totalViews: totalViews[0] ? totalViews[0].totalViews : 0,
            totalSubscribers
        }));
    });
    

// TODO: Get all the videos uploaded by the channel
const getChannelVideos = asyncHandler(async (req, res) => {
    
    
        const { channelId } = req.params; // Assuming the channelId is passed as a route parameter
    
        const videos = await Video.find({ channelId }).sort({ createdAt: -1 }); // Sort by newest first
    
        if (!videos || videos.length === 0) {
            throw new ApiError(404, "No videos found for this channel");
        }
    
        res.status(200).json(new ApiResponse(videos));
    });
    


export {
    getChannelStats, 
    getChannelVideos
    }