import { OpenAI } from 'openai';
import { OpenAIPrompt } from "./promtGenerator";
import logger from "../logger";

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
        logger.error("failed hit completions to open ai ", e)
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

export async function answers(prompt: OpenAIPrompt) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: "user", content: prompt.content }
        ],
        temperature: CONFIG_TEMPERATURE,
        max_completion_tokens: CONFIG_MAX_COMPLETION_TOKENS
    });

    const content = response.choices[0]?.message?.content ?? ``;
    const tokenUsage = response.usage;
    let result = JSON.parse(`{"content": "${content}"}`)
    try {
        result.token_usage = tokenUsage;
    } catch (e) {
        logger.error("failed get answer hit to open ai ", e)
        result = {
            content: '',
            token_usage: {
                completion_tokens: 0,
                prompt_tokens: 0,
                total_tokens: 0,
            }
        };
    }
    return result;
}