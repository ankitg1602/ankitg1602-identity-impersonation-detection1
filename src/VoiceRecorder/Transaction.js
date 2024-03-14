import React, { useState, useRef } from 'react';
import VoiceRecorder from './VoiceRecorder';
import { confirmTransactionWithVoice } from './api'; 

function Transaction() {
  const [transactionDetails, setTransactionDetails] = useState({
    amount: '',
    recipient: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null); // 'success', 'failure', 'pending'

  const handleInputChange = (event) => {
    setTransactionDetails({
      ...transactionDetails,
      [event.target.name]: event.target.value
    });
  };

  const startVoiceConfirmation = async () => {
    setIsRecording(true);
    setTransactionStatus(null);
  };

  const handleRecordingComplete = async (audioBlob) => {
    setIsRecording(false);
    setTransactionStatus('pending');

    try {
      const result = await confirmTransactionWithVoice(transactionDetails, audioBlob);

      if (result.success) {
        setTransactionStatus('success');
      } else {
        setTransactionStatus('failure');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      setTransactionStatus('failure');
    }
  };

  return (
    <div>
      <h2>Transaction Details</h2>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" name="amount" value={transactionDetails.amount} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="recipient">Recipient:</label>
        <input type="text" id="recipient" name="recipient" value={transactionDetails.recipient} onChange={handleInputChange} />
      </div>

      <button onClick={startVoiceConfirmation} disabled={isRecording}>
        Confirm with Voice
      </button>

      {isRecording && <VoiceRecorder onRecordingComplete={handleRecordingComplete} />}

      {transactionStatus === 'success' && (
        <div>Transaction Successful!</div>
      )}
      {transactionStatus === 'failure' && (
        <div>Transaction Failed. Please try again.</div>
      )}
    </div>
  );
}

export default Transaction;
