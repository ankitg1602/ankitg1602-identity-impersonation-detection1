import logo from './logo.svg';
import VoiceRecorder from './VoiceRecorder/VoiceRecorder';
import './App.css';

function App() {
    const handleRecordingComplete = (blob) => {
        // Send 'blob' to your backend API for Azure processing
    }

    return (
        <div>
            <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
            {/* Other components */}
        </div>
    );
}

export default App;
