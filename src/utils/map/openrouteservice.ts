import axios from 'axios';
import logger from '../logger';

const OPENROUTESERVICE_API_BASE = 'https://api.openrouteservice.org/v2/directions/driving-car';

export async function directions(param: any) {
    const apiKey = process.env.OPENROUTESERVICE_API_KEY;
    if (!apiKey) throw new Error('OPENROUTESERVICE_API_KEY is not defined');
    param.api_key = apiKey;
    try {
        const response = await axios.get(`${OPENROUTESERVICE_API_BASE}`, {
            params: param,
        });
        return response.data;
    } catch (err) {
        logger.error('Get Routes API error:', err);
        throw err;
    }
}