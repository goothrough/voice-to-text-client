import { useState, useRef, useEffect } from 'react'
import WavEncoder from "wav-encoder";
import { sendFormData } from '../../services/voice-recorder-service'
import Modal from '../../components/modal/modal';
import { TranscriptResult } from '@/services/model/api-responce';

import { HiMicrophone, HiMiniStopCircle } from "react-icons/hi2";

interface Prop {
    updateIsDateUpdated: () => void;
}

function VoiceRecorder({ updateIsDateUpdated }: Prop) {
    const [isRecording, setIsRecording] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [audioFile, setAudioFile] = useState<Blob | null>(null);
    const [transcriptResult, setTranscriptResult] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);

        // Initialize audio file and transcript result
        setAudioFile(null);
        setTranscriptResult('');

        // Trigger updating history table
        updateIsDateUpdated();
    }

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
                setAudioFile(wavBlob);

                // Reset the chunk
                audioChunksRef.current = [];
            };

        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    useEffect(() => {
        initializeMediaRecorder();
    }, []);

    const startRecording = () => {
        if (!mediaRecorderRef.current) {
            return;
        }

        // Start recording
        mediaRecorderRef.current.start();
        setIsRecording(true);

        // Stop recording in 20 seconds
        // (Wit.ai suggests that the recording duration is shorter than 20 seconds)
        setTimeout(() => stopRecording(), 20000);
    }

    const stopRecording = async () => {
        if (!mediaRecorderRef.current) {
            return;
        }

        // Stop recording
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    }

    // Decode Blob to WebAudio format
    const decodeAudioBlob = async (blob: Blob): Promise<AudioBuffer> => {
        const arrayBuffer = await blob.arrayBuffer();
        const audioContext = new AudioContext();
        return await audioContext.decodeAudioData(arrayBuffer);
    };

    useEffect(() => {
        // Send request to server
        if (audioFile) {
            sendFormData(audioFile).then((res: TranscriptResult) => {
                console.log(res)
                setTranscriptResult(res.transcript);
                openModal();
            });
        }
    }, [audioFile]);

    return (
        <div className="flex justify-center items-center p-12 bg-gray-100">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="p-4">
                    <h5 className="mb-2 text-2xl font-bold text-gray-900">Recording</h5>
                    <p className="mb-4 text-gray-700">
                        Let's start recording and transcribe it.
                    </p>
                    <div className='flex justify-center'>
                        {!isRecording ?
                            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={startRecording}>
                                <HiMicrophone size={18} />
                                <span className='ml-1'>Start</span>
                            </button>
                            :
                            <button className="flex items-center px-4 py-2  bg-amber-400 text-white rounded hover:bg-amber-600" onClick={stopRecording}>
                                <HiMiniStopCircle size={18} />
                                <span className='ml-1'>Stop</span>
                            </button>
                        }
                    </div>

                </div>
            </div>
            {isOpenModal && <Modal onClose={closeModal} transcriptResult={transcriptResult} />}
        </div>
    )

}
export default VoiceRecorder

