import axios from 'axios';
import type { Note, NoteFormValues, NoteHTTPResponse } from '../types/note';

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export const fetchNotes = async (page: number): Promise<NoteHTTPResponse> => {
  const res = await axios.get<NoteHTTPResponse>('/notes', {
    params: {
      page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data;
};

export const createNote = async (values: NoteFormValues): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', values);
  return data;
};

// export const deleteNote = async noteid => {};
