import { normalizeText } from "../utils/normalizetext";
import { generateOpenAIPromt, generateOpenAIPromtAnswer } from "../utils/ai/promtGenerator";
import { setTokenRedisWithExpired, getTokenFromRedis } from "../utils/redis";
import { answers, completions } from "../utils/ai/openai";
import { placeService } from "./placeService";

class AiService{
    async analyzeIntent(message: string, lat: number, lng: number, current_date: string){
        const cleanedText = normalizeText(message);
        const prompt = generateOpenAIPromt(cleanedText, current_date);
        
        // get cached data first
        const redisKey = `nlu:${cleanedText}`;
        const cached = await getTokenFromRedis(redisKey);
        if (cached) {
            return JSON.parse(cached);
        }

        // analyze AI
        const result = await completions(prompt);

        // handling intent
        switch (result.intent) {
            case "nearby_cafe_current_location":
                // get nearby cafe by current location by lat lang
                const details = await placeService.nearbyCafe(lat, lng)
                result.details = details
                result.center_coordinates = {
                    lat: lat,
                    lng: lng
                }
                break;

            case "nearby_cafe":
                // get nearby cafe by current location by lat lang
                const location = await placeService.getcoordinatebyname(result.entities?.location);
                const nearbyCafe = await placeService.nearbyCafe(location[0].lat, location[0].lon)
                result.details = nearbyCafe
                result.center_coordinates = {
                    lat: location[0].lat,
                    lng: location[0].lon
                }
                break;
                
            case "get_weather":
                break;
            
            case "change_current_location":
                const changeLocationCurrent = await placeService.getcoordinatebyname(result.entities?.location);
                result.details = changeLocationCurrent[0];
                result.center_coordinates = {
                    lat: changeLocationCurrent[0].lat,
                    lng: changeLocationCurrent[0].lon
                }
                break;
                
            case "change_location":
                const changeLocation = await placeService.getcoordinatebyname(result.entities?.location);
                result.details = changeLocation[0];
                result.center_coordinates = {
                    lat: changeLocation[0].lat,
                    lng: changeLocation[0].lon
                }
                break;
            
            case "get_direction":
                const [directionStart, directionEnd] = await Promise.all([
                    placeService.getcoordinatebyname(result.entities?.start),
                    placeService.getcoordinatebyname(result.entities?.end),
                ]);

                if (directionStart && directionEnd) {
                    const startCoordinates = `${directionStart[0].lon},${directionStart[0].lat}`;
                    const endCoordinates = `${directionEnd[0].lon},${directionEnd[0].lat}`;

                    const routes = await placeService.routes(startCoordinates, endCoordinates);
                    result.details = routes;
                    result.start_coordinates = {
                        lat: directionStart[0].lat,
                        lng: directionStart[0].lon,
                    };
                    result.end_coordinates = {
                        lat: directionEnd[0].lat,
                        lng: directionEnd[0].lon,
                    };
                    result.center_coordinates = {
                        lat: directionStart[0].lat,
                        lng: directionStart[0].lon,
                    }
                }
                break;

            case "goodbye":
                break;

            default:
                break;
        }

        // generate answer 
        const promptAnswer = generateOpenAIPromtAnswer(cleanedText);
        const answer = await answers(promptAnswer);
        result.answer = answer.content;
        
        // cahched response to redis
        await setTokenRedisWithExpired(redisKey, JSON.stringify(result), 86400);

        return result;
    }
}

export const aiService = new AiService();