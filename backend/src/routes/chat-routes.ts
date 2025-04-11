import { Router } from "express";
import { verifyTheToken } from "../utils/token.manager.js";
import {
  clearChat,
  generateChatCompletion,
  getResponseGoogleBard,
} from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.post("/bard", verifyTheToken, getResponseGoogleBard);
chatRouter.post("/openai", verifyTheToken, generateChatCompletion);
chatRouter.delete("/clear", verifyTheToken, clearChat);

export default chatRouter;
