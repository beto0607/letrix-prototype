import React from 'react';
import styles from './App.module.scss';
import { BoardComponent } from './components/Board/Board';
import { shuffle } from './utils';
import { Provider } from 'react-redux';
import { store } from './store';
import { WordsCounterComponent } from './components/WordsCounter/WordsCounter';
import { TimerComponent } from './components/Timer/Timer';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Letrix by Boemiz</title>
      </Helmet>
      <div className={styles['App']}>
        <header className={styles["App-header"]}>
          <h2>Letrix</h2>
          <WordsCounterComponent wordsGoal={8} />
          <TimerComponent timerGoal={10} />
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
