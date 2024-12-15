interface Props {
    onClose: () => void;
    transcriptResult: string;
    errorMessage: string;
}

function Modal({ onClose, transcriptResult, errorMessage }: Props) {

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-300 bg-opacity-60 flex justify-center items-center">
            <div className="z-10 w-1/2 p-4 bg-white rounded-lg shadow-md border">
                <h2 className="text-base font-semibold text-gray-900">Recording Result</h2>
                <div className="mt-3 border-b"></div>
                <div className="p-2">
                    {transcriptResult &&
                        <span>{transcriptResult}</span>
                    }
                    {errorMessage &&
                        <span>{errorMessage}</span>
                    }
                </div>
                <div className="mb-3"></div>
                <div className="grid justify-items-end">
                    <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;