export interface IntentChat {
    intent: string;
    entities: {
        start: string | null;
        end: string | null;
        location: string | null;
        date: string | null;
        time: string | null;
    };
    details?: any,
    start_coordinates?: any,
    end_coordinates?: any,
    center_coordinates?: any,
    answer?: string,
    token_usage: {
        prompt_tokens?: number | null;
        completion_tokens?: number | null;
        total_tokens?: number | null;
    };
}

export interface IntentAnalizeResult {
    intent_chat: IntentChat;
    original_text?: string;
    prompt_tokens?: any;
    completion_tokens?: any;
    total_tokens?: any;
}