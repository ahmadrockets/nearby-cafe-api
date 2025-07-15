import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import logger from '../utils/logger';
import { getNearbyPlaces } from "../utils/forsquare";

export class PlaceController {
    async getNearbyPlaces(req: Request, res: Response): Promise<Response> {
        try {
            const { lat, lng } = req.query;
            if (!lat || !lng) {
                logger.error('Error getting nearby places, lat and lng are required');
                return sendError(res, 'Failed to get nearby places, lat and lng are required');
            }

            logger.info('Nearby Places requested', { userId: req.user?.id });
            let nearbyPlaces = await getNearbyPlaces(Number(lat), Number(lng));
            return sendSuccess(res, 'Nearby Places retrieved successfully', nearbyPlaces);
        } catch (error) {
            logger.error('Error getting nearby places', error);
            return sendError(res, 'Failed to get nearby places');
        }
    }
}

export const placeController = new PlaceController();
