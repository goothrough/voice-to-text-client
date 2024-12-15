function LoadingSpinner() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-300 bg-opacity-60 flex justify-center items-center">
            <div className="w-16 h-16 z-10 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500"></div>
        </div>
    );
}

export default LoadingSpinner;