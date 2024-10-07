import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

// TODO: toggle subscription
const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const subscriberId = req.user.id; // Assuming you have user info in req.user

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const existingSubscription = await Subscription.findOne({ channelId, subscriberId });

    if (existingSubscription) {
        // If it exists, remove the subscription
        await Subscription.findOneAndDelete({ channelId, subscriberId });
        return res.status(200).json(new ApiResponse({ message: "Unsubscribed successfully" }));
    } else {
        // Otherwise, add a new subscription
        const newSubscription = await Subscription.create({ channelId, subscriberId });
        return res.status(201).json(new ApiResponse(newSubscription));
    }
});

// controller to return subscriber list of a channel
// This function returns the list of subscribers for a specific channel.
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const subscribers = await Subscription.find({ channelId }).populate('subscriberId'); // Assuming subscriberId is referenced in the Subscription model

    if (!subscribers || subscribers.length === 0) {
        return res.status(404).json(new ApiResponse({ message: "No subscribers found for this channel" }));
    }

    res.status(200).json(new ApiResponse(subscribers));
});


// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID");
    }

    const subscriptions = await Subscription.find({ subscriberId }).populate('channelId'); // Assuming channelId is referenced in the Subscription model

    if (!subscriptions || subscriptions.length === 0) {
        return res.status(404).json(new ApiResponse({ message: "No subscribed channels found for this user" }));
    }

    res.status(200).json(new ApiResponse(subscriptions));
});


export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}