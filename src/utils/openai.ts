import { OpenAI } from 'openai';
import { setTokenRedisWithExpired, getTokenFromRedis } from "../utils/redis";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function analyzeIntentLLM(cleanText: string) {
    const redisKey = `nlu:${cleanText}`;

    const cached = await getTokenFromRedis(redisKey);
    if (cached) {
        return JSON.parse(cached);
    }

    const prompt = `Return a one-line JSON from this sentence. Format: {\"intent\": \"get_weather | nearby_cafe | nearby_cafe_current_location | change_current_location | get_direction | change_location | goodbye | invalid_content\", \"entities\": {\"start\": \"...\", \"end\": \"...\", \"location\": \"...\", \"date\": \"YYYY-MM-DD\", \"time\": \"H:i:s\"}}. Remove entities for missing values. Sentence: \"${cleanText}\"`;
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt}],
        temperature: 0.3,
        max_completion_tokens: 100
    });

    const content       = response.choices[0]?.message?.content ?? `{\"intent\": \"invalid_intent\"}`;
    const tokenUsage    = response.usage;
    let result;

    try {
        result              = JSON.parse(content);
        result.token_usage  = tokenUsage;
    } catch (e) {
        result = {
            intent: 'unknown',
            entities: {},
            original_text: cleanText
        };
    }

    await setTokenRedisWithExpired(redisKey, JSON.stringify(result), 86400);
    return result;
}