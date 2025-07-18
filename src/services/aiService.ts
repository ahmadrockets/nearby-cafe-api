import { normalizeText } from "../utils/normalizetext";
import { generateOpenAIPromt } from "../utils/ai/promtGenerator";
import { setTokenRedisWithExpired, getTokenFromRedis } from "../utils/redis";
import { completions } from "../utils/ai/openai";

class AiService{
    async analyzeIntent(message: string){
        const cleanedText = normalizeText(message);
        const prompt = generateOpenAIPromt(cleanedText);
        
        // get cached data first
        const redisKey = `nlu:${cleanedText}`;
        const cached = await getTokenFromRedis(redisKey);
        if (cached) {
            return JSON.parse(cached);
        }

        // analyze AI
        const result = await completions(prompt);
        
        // cahched response to redis
        await setTokenRedisWithExpired(redisKey, JSON.stringify(result), 86400);

        return result;
    }
}

export const aiService = new AiService();