import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


//TODO: get all videos based on query, sort, pagination
const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc', userId } = req.query;

    const filter = userId ? { userId } : {};
    if (query) {
        filter.title = { $regex: query, $options: 'i' }; // Case-insensitive search
    }

    const videos = await Video.find(filter)
        .sort({ [sortBy]: sortType === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const totalVideos = await Video.countDocuments(filter);
    const totalPages = Math.ceil(totalVideos / limit);

    res.status(200).json(new ApiResponse({ videos, totalPages, totalVideos }));
});

/*
const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc', userId } = req.query;
  const filter = query ? { title: new RegExp(query, 'i') } : {};
  const videos = await Video.find(filter)
    .sort({ [sortBy]: sortType === 'desc' ? -1 : 1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const count = await Video.countDocuments(filter);

  return res.status(200).json(new ApiResponse(200, { videos, total: count }, "Videos fetched successfully"));
});

*/



// TODO: get video, upload to cloudinary, create video
// This function allows a user to upload a video to Cloudinary and create a video record in the database.
const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id; // Assuming user info is in req.user

    if (!req.file) {
        throw new ApiError(400, "Video file is required");
    }

    const videoUrl = await uploadOnCloudinary(req.file.path); // Upload video to Cloudinary

    const newVideo = await Video.create({
        title,
        description,
        videoUrl,
        userId
    });

    res.status(201).json(new ApiResponse(newVideo));
});



//TODO: get video by id - allows a user to delete a video.
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    res.status(200).json(new ApiResponse(video));
});




// This function updates the details of a video, like title, description, and thumbnail.
const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { title, description },
        { new: true }
    );

    if (!updatedVideo) {
        throw new ApiError(404, "Video not found");
    }

    res.status(200).json(new ApiResponse(updatedVideo));
});



// This function allows a user to delete a video
const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const deletedVideo = await Video.findByIdAndDelete(videoId);
    if (!deletedVideo) {
        throw new ApiError(404, "Video not found");
    }

    res.status(200).json(new ApiResponse({ message: "Video deleted successfully" }));
});


// This function toggles the publish status of a video.
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    video.isPublished = !video.isPublished; // Toggle publish status
    await video.save();

    res.status(200).json(new ApiResponse(video));
});



export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}