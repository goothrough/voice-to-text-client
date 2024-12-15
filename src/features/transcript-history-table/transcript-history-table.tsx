import { useState, useEffect } from 'react'
import { getTranscriptHistory } from '../../services/voice-recorder-service'
import { TranscriptHistory } from '../../services/model/api-responce';


interface Prop {
    isDataUpdated: boolean;
    showSpinner: () => void;
    hideSpinner: () => void;
}

function TranscriptHistoryTable({ isDataUpdated, showSpinner, hideSpinner }: Prop) {
    const [transcriptHistory, setTranscriptHistory] = useState<TranscriptHistory[]>([])

    useEffect(() => {
        // Send request to server
        showSpinner();
        getTranscriptHistory().then(data => {
            setTranscriptHistory(data);
        }).catch((error: Error) => {

        }).finally(() => {
            hideSpinner();
        });

    }, [isDataUpdated]);


    return (
        <div className='pt-5 h-80 overflow-y-auto'>
            <table className="table-auto">
                <thead>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="border px-4 py-2">Transcript</td>
                        <td className="border px-4 py-2">Created At</td>
                    </tr>
                    {transcriptHistory &&
                        (transcriptHistory.map((item: any) => (
                            <tr className="bg-gray-50 hover:bg-gray-100" key={item.id}>
                                <td className="border px-4 py-2">{item.transcript}</td>
                                <td className="border px-4 py-2">{item.createdAt}</td>
                            </tr>
                        )))
                    }
                </tbody>
            </table>
        </div>
    )

}
export default TranscriptHistoryTable

