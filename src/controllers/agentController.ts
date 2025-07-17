import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import logger from '../utils/logger';
import { normalizeText } from "../utils/normalizetext";
import { analyzeIntentLLM } from "../utils/openai";
import { IntentChat } from "../types/chat";

export class AgentController {
    async handleChat(req: Request, res: Response): Promise<Response> {
        try {
            const { message } = req.body;

            if (!message || typeof message !== 'string') {
                logger.error('Error generate chat, Invalid message format');
                return sendError(res, 'Invalid message format');
            }
            const cleanedText = normalizeText(message);

            const result = await analyzeIntentLLM(cleanedText);
            const resIntent = result as IntentChat;

            const resData = {
                intent: resIntent.intent,
                entities: resIntent.entities
            }

            return sendSuccess(res, 'chat retrieved successfully', resData);
        } catch (error) {
            logger.error('Error getting chat', error);
            return sendError(res, 'Failed to get chat');
        }
    }
}

export const agentController = new AgentController();
