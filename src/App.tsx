import React from 'react';
import './App.css';
import { Board } from './components/Board/Board';

const words: Array<string> = [
  'abuela',
  'abuelo',
  'esposa',
  'esposo',
  'hermana',
  'hermano',
  'hija',
  'hijo',
  'madre',
  'nieta',
  'nieto',
  'padre',
  'prima',
  'primo',
  'tía',
  'tío',
  'sobrino',
  'sobrina',
  'bisabuelo',
  'bisabuela',
  'yerno',
  'nuera'
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
