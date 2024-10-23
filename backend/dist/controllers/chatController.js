import UserModel from "../models/UserModel.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        // Find the user by ID
        const user = await UserModel.findById(res.locals._id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered OR Token malfunctioned",
                success: false,
                error: true,
            });
        }
        // Map user chats to OpenAI-compatible format
        const chats = user.chats.map(({ role, content }) => ({
            role: role,
            content,
        }));
        // Add the new user message
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // Configure OpenAI API client
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        // Send chats to OpenAI API
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", //gpt-3.5-turbo
            messages: chats,
        });
        // Get the OpenAI response message
        const openAiMessage = chatResponse.data.choices[0]?.message;
        if (openAiMessage) {
            user.chats.push(openAiMessage);
        }
        // Save the updated chat history
        await user.save();
        // Send the response with the updated chat history
        return res.status(200).json({
            message: "Chat updated successfully",
            chats: user.chats,
            success: true,
            error: false,
        });
    }
    catch (error) {
        // Check for specific quota exceeded error
        if (error.response?.data?.error?.message.includes("You exceeded your current quota")) {
            return res.status(429).json({
                message: "You exceeded your current quota. Please upgrade your plan or check billing details.",
                success: false,
                error: true,
            });
        }
        return res.status(500).json({
            message: error.response?.data?.error?.message || "Something went wrong",
            success: false,
            error: true,
        });
    }
};
export const getResponseGoogleBard = async (req, res, next) => {
    try {
        const { message } = req.body;
        // Find the user by ID
        const user = await UserModel.findById(res.locals._id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered OR Token malfunctioned",
                success: false,
                error: true,
            });
        }
        const chats = user.chats.map(({ role, content }) => ({
            role: role,
            content,
        }));
        // Add the new user message
        chats.push({ content: message, role: "user" }); // Use 'content' instead of 'message'
        user.chats.push({ content: message, role: "user" }); // Use 'content' instead of 'message'
        // Validate the prompt
        if (!message) {
            throw new Error("Propmt is required...😶");
        }
        const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Initialize Google Generative AI
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message); // Generate content using the prompt
        const response = await result.response;
        const text = await response.text(); // Extract the text from the response
        // Send the generated output back to the client
        user.chats.push({ role: "assistant", content: text });
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Response of Google Bard",
            data: text,
            error: false,
        });
    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: err.message || err,
            error: true,
        });
    }
};
export const clearChat = async (req, res, next) => {
    try { // Find the user by ID
        const user = await UserModel.findById(res.locals._id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered OR Token malfunctioned",
                success: false,
                error: true,
            });
        }
        user.chats.splice(0);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Chat Cleared Successfully...😊",
            error: false,
        });
    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: err.message || err,
            error: true,
        });
    }
};
//# sourceMappingURL=chatController.js.map