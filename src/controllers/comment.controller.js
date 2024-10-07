import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

//TODO: get all comments for a video
const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const comments = await Comment.find({ videoId })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }); // Sort by newest first

    if (!comments || comments.length === 0) {
        throw new ApiError(404, "No comments found for this video");
    }

    res.status(200).json(new ApiResponse(comments));
});

// TODO: add a comment to a video
const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { userId, content } = req.body; // Assuming the userId and comment content come in the body

    const newComment = await Comment.create({
        videoId,
        userId,
        content,
        createdAt: new Date()
    });

    res.status(201).json(new ApiResponse(newComment));
});



// TODO: update a comment
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body; // Updated content

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
    );

    if (!updatedComment) {
        throw new ApiError(404, "Comment not found");
    }

    res.status(200).json(new ApiResponse(updatedComment));
});

// TODO: delete a comment
const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
        throw new ApiError(404, "Comment not found");
    }

    res.status(200).json(new ApiResponse({ message: "Comment deleted successfully" }));
});


export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }