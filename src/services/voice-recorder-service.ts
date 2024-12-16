import axios from 'axios';
import { TranscriptResult, TranscriptHistory, ErrorResponse } from './model/api-responce'
import { BASE_API_URL } from "../config";

export const sendFormData = (file: Blob): Promise<TranscriptResult> => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(BASE_API_URL + '/convertAudioDataToTranscript', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        },
    }).then(response => {
        const transcriptResult: TranscriptResult = response.data;
        return transcriptResult;
    }).catch(error => {
        console.error(error);
        const errorResponse: ErrorResponse = error.response.data;
        throw new Error(errorResponse.message);
    });
};

export const getTranscriptHistory = (): Promise<TranscriptHistory[]> => {

    return axios.get(BASE_API_URL + '/getTranscriptRecords', {
    }).then(response => {
        const transcriptHistories: TranscriptHistory[] = response.data;
        return transcriptHistories;
    }).catch(error => {
        console.error(error);
        const errorResponse: ErrorResponse = error.response.data;
        throw new Error(errorResponse.message);
    });

}
