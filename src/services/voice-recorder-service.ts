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
        return response.data;
    }).catch(error => {
        console.error(error);
        const errorResponse: ErrorResponse = error.response.data;
        throw new Error(errorResponse.message);
    });
};

export const getTranscriptHistory = (): Promise<TranscriptHistory[]> => {

    return axios.get(BASE_API_URL + '/getTranscriptRecords', {
    }).then(response => {
        return response.data;
    }).catch((error: ErrorResponse) => {
        console.error(error);
        throw new Error(error.message);
    });

}
