import { useState } from 'react';
import TranscriptHistoryTable from '../features/transcript-history-table/transcript-history-table'
import VoiceRecorder from '../features/voice-recorder/voice-recorder'

function Home() {
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  const updateIsDateUpdated = () => {
    setIsDataUpdated(prev => !prev)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Voice Recorder</h1>
      <VoiceRecorder updateIsDateUpdated={updateIsDateUpdated} />
      <TranscriptHistoryTable isDataUpdated={isDataUpdated} />
    </div>
  )
}

export default Home;
