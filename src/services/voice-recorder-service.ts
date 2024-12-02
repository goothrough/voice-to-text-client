import axios from 'axios';

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
