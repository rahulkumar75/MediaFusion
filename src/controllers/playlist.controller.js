import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//TODO: create playlist
const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id; // Assuming you have user info in req.user

  if (!name) {
    throw new ApiError(400, "Playlist name is required");
  }

  const newPlaylist = await Playlist.create({ name, description, userId });
  res.status(201).json(new ApiResponse(newPlaylist));
});

//TODO: get user playlists - retrieves all playlists for a specific user.
const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const playlists = await Playlist.find({ userId }).sort({ createdAt: -1 });

  if (!playlists || playlists.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse({ message: "No playlists found for this user" }));
  }

  res.status(200).json(new ApiResponse(playlists));
});

//TODO: get playlist by id
const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  res.status(200).json(new ApiResponse(playlist));
});

// adds a video to a specific playlist.
const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid playlist or video ID");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  if (!playlist.videos.includes(videoId)) {
    playlist.videos.push(videoId);
    await playlist.save();
  }

  res.status(200).json(new ApiResponse(playlist));
});

// TODO: remove video from playlist
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid playlist or video ID");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  playlist.videos = playlist.videos.filter((id) => id.toString() !== videoId);
  await playlist.save();

  res
    .status(200)
    .json(
      new ApiResponse({ message: "Video removed from playlist", playlist })
    );
});

// TODO: delete playlist
const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID");
  }

  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

  if (!deletedPlaylist) {
    throw new ApiError(404, "Playlist not found");
  }

  res
    .status(200)
    .json(new ApiResponse({ message: "Playlist deleted successfully" }));
});

//TODO: update playlist
const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID");
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { name, description },
    { new: true }
  );

  if (!updatedPlaylist) {
    throw new ApiError(404, "Playlist not found");
  }

  res.status(200).json(new ApiResponse(updatedPlaylist));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
