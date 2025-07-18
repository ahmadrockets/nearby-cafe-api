import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import logger from '../utils/logger';
import { aiService } from "../services/aiService";
import { IntentChat } from "../types/chat";

export class AgentController {
    async handleChat(req: Request, res: Response): Promise<Response> {
        try {
            const { message, lat, lng, current_date } = req.body;

            if (!message || typeof message !== 'string') {
                logger.error('Error generate chat, Invalid message format');
                return sendError(res, 'Invalid message format');
            }
            const result = await aiService.analyzeIntent(message, lat, lng, current_date);
            const resIntent = result as IntentChat;
            const resData = {
                intent: resIntent.intent,
                entities: resIntent.entities,
                details: resIntent.details,
                answer: resIntent.answer,
                start_coordinates: resIntent.start_coordinates,
                end_coordinates: resIntent.end_coordinates,
                center_coordinates: resIntent.center_coordinates,
            }


            return sendSuccess(res, 'chat retrieved successfully', resData);
        } catch (error) {
            logger.error('Error getting chat', error);
            return sendError(res, 'Failed to get chat');
        }
    }
}

export const agentController = new AgentController();
