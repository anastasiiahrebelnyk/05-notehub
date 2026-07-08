import { useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes } from '../../services/NoteService';

export default function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetchNotes(),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {data && !isLoading && <NoteList notes={data} />}
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}
