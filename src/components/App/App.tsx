import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import { Oval } from 'react-loader-spinner';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setCurrentPage(1);
  }, 1000);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', search, currentPage],
    queryFn: () => fetchNotes(currentPage, search),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Oval color="black" secondaryColor="gray" />}
      {data && !isLoading && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
}
