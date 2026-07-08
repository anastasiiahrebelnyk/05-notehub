import axios from 'axios';
import type { Note } from '../types/note';

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await axios.get<Note[]>('/notes', {
    params: {},
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data.notes;
};

// export const createNote = async () => {};

// export const deleteNote = async noteid => {};
