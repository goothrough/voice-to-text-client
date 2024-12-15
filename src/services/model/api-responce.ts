export interface TranscriptHistory {
    id: number;
    transcript: string;
    createdAt: Date;
}

export interface TranscriptResult {
    transcript: string;
}

export interface ErrorResponse {
    error: string;
    message: string;
}