import { useState } from 'react';
import Modal from '../components/modal/modal';
import TranscriptHistoryTable from '../features/transcript-history-table/transcript-history-table'
import VoiceRecorder from '../features/voice-recorder/voice-recorder'

function Home() {

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Voice Recorder</h1>
      <VoiceRecorder />
      <TranscriptHistoryTable />
    </div>
  )
}

export default Home;
