import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [prompt, setPrompt] = useState('');


  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then((events) => events.json())
      .catch(err => console.log(err));
  }, []);

  function handlePromptChange(event) {
    setPrompt(event.target.value);
  }

  function postEvent(event) {
    event.preventDefault();
    fetch('http://localhost:3001/events', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt
      })
    })
      .then(res => res.json())

    setPrompt('');

  }

  return (
    <>
      <div className="App">

        <h1 className='header'>
          Give me movies
        </h1>

        <div className='body'>

          <p className='summary'>
            Give me movies is a website that uses AI to suggest movies according to prompts. Try typing something
            like "I want to watch a rom-com which is less than 2 hours long and with Tom Hanks in it" on the box below!
          </p>

          <input className='prompt' placeholder='Insert a prompt...' value={prompt} onChange={handlePromptChange}></input>

        </div>
      </div>

    </>
  );
}

export default App;
