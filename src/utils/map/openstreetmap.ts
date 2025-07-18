import axios from 'axios';
import logger from '../logger';

const OPENSTREETMAP_API_BASE = 'https://nominatim.openstreetmap.org/search';

export async function getcoordinatebyname(param: any) {
    param.format = "json";
    param.polygon = "1";
    param.addressdetails = "1";
    try {
        const response = await axios.get(`${OPENSTREETMAP_API_BASE}`, {
            params: param,
        });
        return response.data;
    } catch (err) {
        logger.error('Get Coordinats Openstreetmap API error:', err);
        throw err;
    }
}