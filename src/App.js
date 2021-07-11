import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItems] = useState({});
  const [showPunchline, setShowPunchline] = useState(false);

  useEffect(() => {
    getRandomJoke();
  }, [])


  function getRandomJoke() {
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then(res => res.json())
      .then(
        (result) => {
          setShowPunchline(false);
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="mainDiv">
        <h2>Random Joke</h2>
        <span>{item.setup}</span><br />
        <button className={showPunchline ? "hide" : "show"} onClick={() => setShowPunchline(true)}>Show Punchline</button>
        <div className={showPunchline ? "show" : "hide"}>{item.punchline}</div>
        <br />
        <button className="reload" onClick={() => getRandomJoke()}>New Joke &#x21bb;</button>
      </div>
    );
  }
}

export default App;