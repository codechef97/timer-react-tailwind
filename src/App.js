import React, { useState, useEffect } from 'react';
import Timer from './components/Timer.js'
import {image1x, image2x}  from './assets/index.js';
import './App.css';

function App() {

  const [data, setData] = useState([]);

  const [timerState, setTimerState] = useState(false);

  useEffect(() => {
    readJson()
  }, []);


  const readJson = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(response => {
      response.json()
      .then(data => {
        setData(data);
      })
      .catch(() => setData({ duration: "00:00:00", url: '', cash_value: 0 }));
    });
  }

  function timerFinished(value) {
    setTimerState(value)
  }

  return (
    <div className="Offer-Container flex items-center justify-center h-screen bg-center bg-cover bg-no-repeat text-center w-screen text-2xl">
      <div className="flex flex-col content-center gap-8 self-center p-4 sm:w-2/4 xl:w-1/4  absolute border-gray-300 rounded-md border-2 border-solid  "> 
        {!timerState &&
          <div className="description w-auto h-auto text-white justify-center">
            <img
              src={image1x}
              srcSet={`${image1x} 1x, ${image2x} 2x`}
              alt="top-image"
            />
            <p>Get your free £{data.cash_value || 0} now</p>
          </div>
        }
        <Timer duration={data.duration} changeState={(timerZero) => timerFinished(timerZero)} />
        {!timerState && <a className="text-center rounded p-2 text-md bg-gradient-to-r from-red-700 to-indigo-500 animate-grad-effect" href={data.url || ''} target="_blank" rel="noreferrer">Opt-in</a>}
      </div>
    </div>
  );
}

export default App;
