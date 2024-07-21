import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [colorName, setColorName] = useState<string>('');
  const [colorFormat, setColorFormat] = useState<string>('hex');
  const [result, setResult] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const handleConvert = async () => {
    try {
      const response = await axios.get(`https://hono-color-converter.harash-poriya.workers.dev/${colorFormat}/${colorName}`);
      setResult(response.data);
      if (colorFormat === 'hex') {
        setBackgroundColor(response.data);
      } else if (colorFormat === 'rgb') {
        setBackgroundColor(`rgb(${response.data.replace('RGB: ', '')})`);
      }
    } catch (error) {
      console.error('Error fetching the color:', error);
      setResult('Error: Unable to fetch color');
      setBackgroundColor('');
    }
  };

  return (
    <div className='background'>
    <div className="container">
      <h1>Color Converter</h1>
      <div>
        <label>
          Color Name:
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Format:
          <select
            value={colorFormat}
            onChange={(e) => setColorFormat(e.target.value)}
          >
            <option value="hex">Hex</option>
            <option value="rgb">RGB</option>
          </select>
        </label>
      </div>
      <button onClick={handleConvert}>Convert</button>
      {result && (
        <div className="result" style={{ backgroundColor: backgroundColor }}>
          <h2>Converted Color</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
