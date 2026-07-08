import axios from 'axios';
import type { Note, NoteFormValues, NoteHTTPResponse } from '../types/note';

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export const fetchNotes = async (
  page: number,
  search: string | undefined
): Promise<NoteHTTPResponse> => {
  const res = await axios.get<NoteHTTPResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data;
};

export const createNote = async (values: NoteFormValues): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', values, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<void> => {
  await axios.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
};
