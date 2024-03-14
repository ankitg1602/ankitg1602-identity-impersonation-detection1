import axios from 'axios'; // Or another HTTP client library

// Replace with your actual Azure API endpoints and logic
const BASE_API_URL = 'https://your-azure-backend.com/api/voice'; 

export async function enrollVoice(audioBlob, userId) {
  const formData = new FormData();
  formData.append('audioFile', audioBlob);
  formData.append('userId', userId); 

  try {
    const response = await axios.post(`${BASE_API_URL}/enroll`, formData);
    return response.data; 
  } catch (error) {
    console.error("Enrollment Error:", error); 
    throw error; // Re-throw to allow for error handling in components
  }
}

export async function authenticateVoice(audioBlob) {
  // Similar structure to enrollVoice, but with an authentication endpoint
  const formData = new FormData();
  formData.append('audioFile', audioBlob); 

  try {
    const response = await axios.post(`${BASE_API_URL}/authenticate`, formData);
    return response.data; 
  } catch (error) {
    console.error("Authentication Error:", error); 
    throw error;
  }
}

export async function confirmTransactionWithVoice(transactionDetails, audioBlob) {
  // Similar to above functions, but send both transaction details and audio
  const formData = new FormData();
  formData.append('audioFile', audioBlob);
  formData.append('transactionData', JSON.stringify(transactionDetails));

  try {
    const response = await axios.post(`${BASE_API_URL}/transaction`, formData);
    return response.data;
  } catch (error) {
    console.error("Transaction Error:", error);
    throw error;
  }
}
