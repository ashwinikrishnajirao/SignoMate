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
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 2;
  connections.forEach((pair) => {
    const [i, j] = pair;
    ctx.beginPath();
    ctx.moveTo(points[i][0] * ctx.canvas.width, points[i][1] * ctx.canvas.height);
    ctx.lineTo(points[j][0] * ctx.canvas.width, points[j][1] * ctx.canvas.height);
    ctx.stroke();
  });
};

const drawLandmarks = (ctx, points) => {
  ctx.fillStyle = 'red';
  points.forEach(point => {
    const x = point[0] * ctx.canvas.width;
    const y = point[1] * ctx.canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  });
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
    // Create a new canvas and context for flipping
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // Set the canvas dimensions
    tempCanvas.width = webcamRef.current.video.videoWidth;
    tempCanvas.height = webcamRef.current.video.videoHeight;
    
    // Create an image element
    const image = new Image();
    image.src = imageSrc;
    
    image.onload = () => {
      // Draw the image on the temporary canvas
      tempCtx.drawImage(image, 0, 0);
  
      // Flip the canvas horizontally
      tempCtx.save();
      tempCtx.scale(-1, 1);
      tempCtx.translate(-tempCanvas.width, 0);
      tempCtx.drawImage(image, 0, 0);
      tempCtx.restore();
  
      // Convert the flipped canvas to base64
      const flippedImageSrc = tempCanvas.toDataURL('image/jpeg');
  
      // Send the flipped image to the backend
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
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        result.landmarks.forEach(landmarkSet => {
          drawConnectors(ctx, landmarkSet, HAND_CONNECTIONS);
          drawLandmarks(ctx, landmarkSet);
        });
      });
    };
  };
  

  useEffect(() => {
    if (capturing) {
      const interval = setInterval(() => {
        capture();
      }, 500); // Capture every half second
      return () => clearInterval(interval);
    }
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
