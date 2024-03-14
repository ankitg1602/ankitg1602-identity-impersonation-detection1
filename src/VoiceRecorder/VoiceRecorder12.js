import React, { useState, useEffect } from 'react';
import ReactMic from 'react-mic';

function VoiceRecorder({ onRecordingComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  }

  const stopRecording = () => {
    setIsRecording(false);
  }

  const onData = (recordedChunk) => {
    // Handle raw audio data if needed
  }

  const onStop = (recordedBlob) => {
    setRecordedBlob(recordedBlob);
    onRecordingComplete(recordedBlob.blob); // Pass the blob to parent component
  }

  return (
    <div>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#0099FF" // Customize as needed
        backgroundColor="#DDD" 
      />
      <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
    </div>
  );
}

export default VoiceRecorder;
