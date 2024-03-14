import React, { useState, useRef } from 'react';
import VoiceRecorder from './VoiceRecorder'; // Assume you have the VoiceRecorder component
import { authenticateVoice } from './api'; // Your API function for authentication

function Authentication() {
  const [isRecording, setIsRecording] = useState(false);
  const [authStatus, setAuthStatus] = useState(null); // 'success', 'failure', 'pending'
  const audioRef = useRef(null);

  const startRecording = () => {
    setIsRecording(true);
    setAuthStatus(null);
  };

  const handleRecordingComplete = async (audioBlob) => {
    setIsRecording(false);
    setAuthStatus('pending');

    try {
      const authResult = await authenticateVoice(audioBlob); 

      if (authResult.success) {
        setAuthStatus('success');
        // Handle successful authentication (e.g., redirect to protected area)
      } else {
        setAuthStatus('failure');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthStatus('failure');
    }
  };

  return (
    <div>
      {authStatus === 'success' ? (
        <div>Authentication Successful!</div>
      ) : authStatus === 'failure' ? (
        <div>Authentication Failed. Please try again.</div>
      ) : (
        <>
          <p>Speak your passphrase to authenticate:</p>
          <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
          <button onClick={startRecording} disabled={isRecording}>
            {isRecording ? 'Recording...' : 'Start Recording'}
          </button>
        </>
      )}
    </div>
  );
}

export default Authentication;
