import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import logger from '../utils/logger';
import { placeService } from "../services/placeService";

export class PlaceController {
    async getNearbyCafes(req: Request, res: Response): Promise<Response> {
        try {
            const { lat, lng } = req.query;
            if (!lat || !lng) {
                logger.error('Error getting nearby places, lat and lng are required');
                return sendError(res, 'Failed to get nearby places, lat and lng are required');
            }

            logger.info('Nearby Places requested', { userId: req.user?.id });
            let nearbyPlaces = await placeService.nearbyCafe(Number(lat), Number(lng));
            return sendSuccess(res, 'Nearby Places retrieved successfully', nearbyPlaces);
        } catch (error) {
            logger.error('Error getting nearby places', error);
            return sendError(res, 'Failed to get nearby places');
        }
    }

    async getRoutes(req: Request, res: Response): Promise<Response> {
        try {
            const { start, end } = req.query;
            if (!start || !end) {
                logger.error('Error getting routes, start and end are required');
                return sendError(res, 'Failed to get routes, start and end are required');
            }

            logger.info('Routes requested', { userId: req.user?.id });
            let routes = await placeService.routes(String(start), String(end));
            return sendSuccess(res, 'Routes retrieved successfully', routes);
        } catch (error) {
            logger.error('Error getting routes', error);
            return sendError(res, 'Failed to get routes');
        }
    }
}

export const placeController = new PlaceController();
