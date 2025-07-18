import axios from 'axios';
import logger from '../logger';

const FORSQUARE_API_BASE = 'https://places-api.foursquare.com/places/search';
const FORSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY || "";
const CONFIG_RADIUS = 10000;
const CONFIG_LIMIT = 50;

export async function searchplaces(param: any) {
    try {
        param.radius = CONFIG_RADIUS;
        param.limit = CONFIG_LIMIT;
        const response = await axios.get(`${FORSQUARE_API_BASE}`, {
            headers: {
                accept: 'application/json',
                'X-Places-Api-Version': '2025-06-17',
                Authorization: `Bearer ${FORSQUARE_API_KEY}`,
            },
            params: param,
        });
        return response.data.results;
    } catch (err) {
        logger.error('Get Routes API error:', err);
        throw err;
    }
}