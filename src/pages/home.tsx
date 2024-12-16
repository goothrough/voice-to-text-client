import { useState } from 'react';
import TranscriptHistoryTable from '../features/transcript-history-table/transcript-history-table'
import VoiceRecorder from '../features/voice-recorder/voice-recorder'
import LoadingSpinner from '../components/ui/loading-spinner';

function Home() {
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);

  const showSpinner = () => {
    setIsShowingSpinner(true);
  }

  const hideSpinner = () => {
    setIsShowingSpinner(false);
  }

  const updateIsDateUpdated = () => {
    setIsDataUpdated(prev => !prev)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center sticky">Voice to Text</h1>
      {isShowingSpinner && <LoadingSpinner />}
      <VoiceRecorder updateIsDateUpdated={updateIsDateUpdated} showSpinner={showSpinner} hideSpinner={hideSpinner} />
      <div className='pb-3'></div>
      <TranscriptHistoryTable isDataUpdated={isDataUpdated} showSpinner={showSpinner} hideSpinner={hideSpinner} />
    </div>
  )
}

export default Home;
