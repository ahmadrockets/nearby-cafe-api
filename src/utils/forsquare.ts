import axios from 'axios';
import logger from '../utils/logger';

const FOURSQUARE_API_BASE = 'https://places-api.foursquare.com/places/search';
const FORSQUARE_CAFEE_CATEGORY = '4bf58dd8d48988d1e0931735';

const OPENROUTESERVICE_API_BASE = 'https://api.openrouteservice.org/v2/directions/driving-car';


export async function getNearbyPlaces(lat: number, lng: number) {
    const apiKey = process.env.FOURSQUARE_API_KEY;
    if (!apiKey) throw new Error('FOURSQUARE_API_KEY is not defined');
    
    try {
        const response = await axios.get(`${FOURSQUARE_API_BASE}`, {
            headers: {
                accept: 'application/json',
                'X-Places-Api-Version': '2025-06-17',
                Authorization: `Bearer ${apiKey}`,
            },
            params: {
                ll: `${lat},${lng}`,
                fsq_category_ids: FORSQUARE_CAFEE_CATEGORY,
                radius: 10000,
                limit: 50,
            },
        });
        return response.data.results;
    } catch (err) {
        console.error('Foursquare API error:', err);
        throw err;
    }
}

export async function getRoutes(start: string, end: string) {
    const apiKey = process.env.OPENROUTESERVICE_API_KEY;
    if (!apiKey) throw new Error('OPENROUTESERVICE_API_KEY is not defined');

    try {
        const response = await axios.get(`${OPENROUTESERVICE_API_BASE}`, {
            params: {
                api_key: apiKey,
                start: start,
                end: end,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Get Routes API error:', err);
        throw err;
    }
}