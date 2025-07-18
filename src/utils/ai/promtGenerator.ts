export interface OpenAIPrompt {
    role: string;
    content: string;
}
export function generateOpenAIPromt(input: string): OpenAIPrompt {
    const prompt = `Return a one-line JSON from this sentence. Format: {\"intent\": \"get_weather | nearby_cafe | nearby_cafe_current_location | change_current_location | get_direction | change_location | goodbye | invalid_content\", \"entities\": {\"start\": \"...\", \"end\": \"...\", \"location\": \"...\", \"date\": \"YYYY-MM-DD\", \"time\": \"H:i:s\"}}. Remove entities for missing values. Sentence: \"${input}\"`;
    const result: OpenAIPrompt = {
        role: "user",
        content: prompt
    }
    return result;
}