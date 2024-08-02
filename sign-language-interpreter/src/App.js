import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import './App.css';

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]
];

const drawConnectors = (ctx, points, connections) => {
  ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)'; // Semi-transparent green
  ctx.lineWidth = 3;
  connections.forEach((pair) => {
    const [i, j] = pair;
    ctx.beginPath();
    ctx.moveTo(points[i][0] * ctx.canvas.width, points[i][1] * ctx.canvas.height);
    ctx.lineTo(points[j][0] * ctx.canvas.width, points[j][1] * ctx.canvas.height);
    ctx.stroke();
  });
};

const drawLandmarks = (ctx, points) => {
  points.forEach((point, index) => {
    const x = point[0] * ctx.canvas.width;
    const y = point[1] * ctx.canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = getLandmarkColor(index);
    ctx.fill();
  });
};

const getLandmarkColor = (index) => {
  if (index === 0) return 'red'; // Thumb
  if (index >= 1 && index <= 4) return 'blue'; // Index finger
  if (index >= 5 && index <= 8) return 'green'; // Middle finger
  if (index >= 9 && index <= 12) return 'purple'; // Ring finger
  return 'orange'; // Pinky
};

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [predictedCharacter, setPredictedCharacter] = useState('');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    analyzeFrame(imageSrc);
  }, [webcamRef]);

  const analyzeFrame = async (imageSrc) => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = webcamRef.current.video.videoWidth;
    tempCanvas.height = webcamRef.current.video.videoHeight;
    
    const image = new Image();
    image.src = imageSrc;
    
    image.onload = () => {
      tempCtx.drawImage(image, 0, 0);
      tempCtx.save();
      tempCtx.scale(-1, 1);
      tempCtx.translate(-tempCanvas.width, 0);
      tempCtx.drawImage(image, 0, 0);
      tempCtx.restore();
      
      const flippedImageSrc = tempCanvas.toDataURL('image/jpeg');
  
      fetch('http://localhost:8000/interpreter/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: flippedImageSrc }),
      })
      .then(response => response.json())
      .then(result => {
        setPredictedCharacter(result.character);
        const ctx = canvasRef.current.getContext('2d');
        const canvas = canvasRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        result.landmarks.forEach(landmarkSet => {
          drawConnectors(ctx, landmarkSet, HAND_CONNECTIONS);
          drawLandmarks(ctx, landmarkSet);
        });
      });
    };
  };

  useEffect(() => {
    let intervalId;
    if (capturing) {
      intervalId = setInterval(() => {
        capture();
      }, 150); // Capture every quarter second
    }
    return () => clearInterval(intervalId);
  }, [capturing, capture]);

  return (
    <div className="App">
      <h1>Sign Language Interpreter</h1>
      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: 'user',
          }}
        />
        <canvas
          ref={canvasRef}
          className="canvas"
          width="640"
          height="480"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
      </div>
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
