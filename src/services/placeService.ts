import { searchplaces } from "../utils/map/forsquare";
import { directions } from "../utils/map/openrouteservice";

const FORSQUARE_CAFEE_CATEGORY = '4bf58dd8d48988d1e0931735';

class PlaceService {
    async nearbyCafe(lat: number, lng: number){
        const param = {
            ll: `${lat},${lng}`,
            fsq_category_ids: FORSQUARE_CAFEE_CATEGORY,
        }
        const result = await searchplaces(param)
        
        return result;
    }

    async routes(start: string, end: string){
        const param = {
            start: start,
            end: end,
        }
        const result = await directions(param)
        return result;
    }
}

export const placeService = new PlaceService();