import React from 'react';
import RandomStringGenerator from './components/RandomStringGenerator';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Random String Generator</h1>
      </header>
      <main>
        <RandomStringGenerator />
      </main>
    </div>
  );
}

export default App;