
import React from 'react';
import Card from '../../components/ui/card'
import { useState, useRef } from 'react'
import WavEncoder from "wav-encoder";



function VoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const initializeMediaRecorder = async () => {
        try {
            // Get mic access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Initialize MediaRecorder        
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            mediaRecorderRef.current = mediaRecorder;

            // Behavior when start recording
            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            // Behavior when stop recording
            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

                // Decode to WebAudio Format
                const audioBuffer = await decodeAudioBlob(audioBlob);
    
                // Encode to WAV
                const wavBuffer = await WavEncoder.encode({
                    sampleRate: audioBuffer.sampleRate,
                    channelData: [audioBuffer.getChannelData(0)],
                });
    
                // Create a wav file data
                const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });

                // Download as a file
                const a = document.createElement('a');
                const audioUrl = URL.createObjectURL(wavBlob);
                a.href = audioUrl;
                a.download = 'recording.wav';
                a.click();

                console.log('Recording saved as WAV file');

                // Reset the chunk
                audioChunksRef.current = [];
            };

            console.log('MediaRecorder initialized.');

        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    React.useEffect(() => {
        console.log('Hello world!');
        initializeMediaRecorder()
    }, []);

    const startRecording = () => {
        // Start recording
        if (!mediaRecorderRef.current) {
            return;
        }

        mediaRecorderRef.current.start();
        setIsRecording(true)
    }

    const stopRecording = async () => {
        if (!mediaRecorderRef.current) {
            return;
        }

        mediaRecorderRef.current.stop();
        setIsRecording(false)
    }

    // Decode Blob to WebAudio format
    const decodeAudioBlob = async (blob: Blob): Promise<AudioBuffer> => {
        const arrayBuffer = await blob.arrayBuffer();
        const audioContext = new AudioContext();
        return await audioContext.decodeAudioData(arrayBuffer);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* <Card
                title="Recording"
                description="This is a beautiful view of mountains and lakes. Perfect for nature lovers."
                buttonText1="Press to start recording"
                buttonText2="Press to stop recording"
            /> */}
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="p-4">
                    <h5 className="mb-2 text-2xl font-bold text-gray-900">Recording</h5>
                    <p className="mb-4 text-gray-700">This is a beautiful view of mountains and lakes. Perfect for nature lovers.</p>
                    {!isRecording ?
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={startRecording}>
                            Press to start recording
                        </button>
                        :
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={stopRecording}>
                            Press to stop recording
                        </button>
                    }
                </div>
            </div>
        </div>
    )

}
export default VoiceRecorder

