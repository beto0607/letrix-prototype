import React from 'react';
import styles from './App.module.scss';
import { BoardComponent } from './components/Board/Board';
import { shuffle, getRandomItem } from './utils';
import { Provider } from 'react-redux';
import { store } from './store';
import { WordsCounterComponent } from './components/WordsCounter/WordsCounter';
import { TimerComponent } from './components/Timer/Timer';
import { Helmet } from 'react-helmet';
import { WordsFindedList } from './components/WordsFindedList/WordsFindedList';
import { Category } from './types/types';

const wordsByCategory: Array<Category> = [
  {
    name: 'Familia',
    words: [
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
      'nuera',
      'suegro',
      'suegra'
    ]
  }
]

const App: React.FC = () => {
  const category: Category = getRandomItem(wordsByCategory);
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
          <TimerComponent timerGoal={120} />
        </header>
        <section>
          <CategoryTitle title={category.name}/>
          <BoardComponent words={shuffle(category.words)} />
        </section>
        <WordsFindedList />
      </div>
    </Provider>
  );
}

export default App;
