import { OpenAI } from 'openai';
import { OpenAIPrompt } from "./promtGenerator";

const CONFIG_TEMPERATURE = 0.3;
const CONFIG_MAX_COMPLETION_TOKENS = 100;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function completions(prompt: OpenAIPrompt) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: "user", content: prompt.content }
        ],
        temperature: CONFIG_TEMPERATURE,
        max_completion_tokens: CONFIG_MAX_COMPLETION_TOKENS
    });

    const content = response.choices[0]?.message?.content ?? `{\"intent\": \"invalid_intent\"}`;
    const tokenUsage = response.usage;
    let result;

    try {
        result              = JSON.parse(content);
        result.token_usage  = tokenUsage;
    } catch (e) {
        result = {
            intent: 'invalid_intent',
            entities: {},
            token_usage : {
                completion_tokens: 0,
                prompt_tokens: 0,
                total_tokens: 0,
            }
        };
    }
    return result;
}