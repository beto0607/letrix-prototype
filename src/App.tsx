import React from 'react';
import './App.css';
import { BoardComponent } from './components/Board/Board';
import { shuffle } from './utils';
import { Provider } from 'react-redux';
import { store } from './store';
import { WordsCounterComponent } from './components/WordsCounter/WordsCounter';
import { TimerComponent } from './components/Timer/Timer';
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
          <WordsCounterComponent wordsGoal={8} />
          <TimerComponent timerGoal={120} />
        </header>
        <section>
          <BoardComponent words={shuffle(words).slice(0)} />
          <aside></aside>
        </section>
      </div>
    </Provider>
  );
}

export default App;
