import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes } from '../../services/NoteService';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['tasks', currentPage],
    queryFn: () => fetchNotes(currentPage),
    // enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  // const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Компонент SearchBox */}
        {/* Пагінація */}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && !isLoading && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm />
        </Modal>
      )}
    </div>
  );
}
