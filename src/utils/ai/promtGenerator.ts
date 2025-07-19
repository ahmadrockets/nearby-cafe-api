export interface OpenAIPrompt {
    role: string;
    content: string;
}
export function generateOpenAIPromt(input: string, current_date: string): OpenAIPrompt {
    const prompt = `Return a one-line JSON from this sentence. Format: {\"intent\": \"get_weather | nearby_cafe | nearby_cafe_current_location | change_current_location | get_direction | change_location | goodbye | invalid_content\", \"entities\": {\"start\": \"...\", \"end\": \"...\", \"location\": \"...\", \"date\": \"YYYY-MM-DD\", \"time\": \"H:i:s\"}}. Remove entities for missing values. And the current time is ${current_date} . Sentence: \"${input}\"`;
    const result: OpenAIPrompt = {
        role: "user",
        content: prompt
    }
    return result;
}

export function generateOpenAIPromtAnswer(input: string): OpenAIPrompt {
    const prompt = `When the user asks something related to maps, directions, or locations, respond as if the map data has already been provided. Do not repeat any data. Instead, respond with a polite follow-up like: “Let me know if you need help with another location.” or “Hope that helps! Anything else I can assist you with?” Keep it short and friendly — no repetition of map info. Answer with one or max two sentences in Bahasa. The question is "${input}"`;
    const result: OpenAIPrompt = {
        role: "user",
        content: prompt
    }
    return result;
}