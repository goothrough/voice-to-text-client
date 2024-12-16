export interface TranscriptHistory {
    id: number;
    transcript: string;
    createdAt: string;
}

export interface TranscriptResult {
    transcript: string;
}

export interface ErrorResponse {
    error: string;
    message: string;
}