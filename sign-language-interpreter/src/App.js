import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [predictedCharacter, setPredictedCharacter] = useState('');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    analyzeFrame(imageSrc);
  };

  const analyzeFrame = async (imageSrc) => {
    // Send the image to the backend for analysis
    const response = await fetch('http://localhost:8000/interpreter/analyze/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageSrc }),
    });
    const result = await response.json();
    setPredictedCharacter(result.character);
  };

  useEffect(() => {
    if (capturing) {
      const interval = setInterval(() => {
        capture();
      }, 1000); // Capture every second
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturing]);

  return (
    <div className="App">
      <h1>Sign Language Interpreter</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
      />
      <div className="controls">
        <button onClick={() => setCapturing(!capturing)}>
          {capturing ? 'Stop' : 'Start'}
        </button>
      </div>
      {predictedCharacter && (
        <div className="result">
          <h2>Predicted Character: {predictedCharacter}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
