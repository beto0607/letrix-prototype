import React from 'react';
import './App.css';
import { Board } from './components/Board/Board';

const words: Array<string> = [
  'sandia',
  'jamon',
  'pomelo',
  'auto',
  'xilofon',
  'batata',
  'agua'
];

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Letrix</h3>
      </header>
      <section>
        <Board words={words} />
        <aside></aside>
      </section>
    </div>
  );
}

export default App;
