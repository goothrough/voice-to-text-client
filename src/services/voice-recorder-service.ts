import axios from 'axios';
import TranscriptHistory from './model/transcript-history'

export const sendFormData = async (file: Blob) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('http://localhost:8080/convertAudioDataToTranscript', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getTranscriptHistory = async (): Promise<TranscriptHistory[] | any> => {
    try {
        const response = await axios.get('http://localhost:8080/getTranscriptRecords');

        console.log('Success:', response);

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}
