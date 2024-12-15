import axios from 'axios';
import { TranscriptResult, TranscriptHistory } from './model/api-responce'

export const sendFormData = async (file: Blob): Promise<TranscriptResult | any> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('http://localhost:8080/convertAudioDataToTranscript', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });

        return response.data;

    } catch (error) {
        console.error('Error:', error);
    }
};

export const getTranscriptHistory = async (): Promise<TranscriptHistory[] | any> => {
    try {
        const response = await axios.get('http://localhost:8080/getTranscriptRecords',{
            
        });

        return response.data;

    } catch (error) {
        console.error('Error:', error);
    }
}
