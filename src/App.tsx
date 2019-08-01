import React from 'react';
import './App.css';
import { Board } from './components/Board/Board';
import { shuffle } from './utils';
import { Provider } from 'react-redux';
import { store } from './store';
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
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h3>Letrix</h3>
        </header>
        <section>
          <Board words={shuffle(words).slice(0, 10)} />
          <aside></aside>
        </section>
      </div>
    </Provider>
  );
}

export default App;
