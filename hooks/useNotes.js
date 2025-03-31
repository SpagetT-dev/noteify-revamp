// src/hooks/useNotes.js
import { create } from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';

const useNotesStore = create(
  persist(
    (set, get) => ({
      notes: [],
      folders: [],
      favorites: [],
      loading: false,
      error: null,

      fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get('/api/notes');
          const { notes, folders } = response.data;
          set({ notes, folders, loading: false });
          const favorites = notes.filter((note) => note.isFavorite);
          set({ favorites });
        } catch (err) {
          set({ error: err.message, loading: false });
          console.error('Failed to fetch notes:', err);
        }
      },

      createNote: async (note) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/notes', {
            ...note,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isFavorite: false,
            tags: note.tags || [],
          });
          const newNote = response.data;
          set({ notes: [...get().notes, newNote], loading: false });
          return newNote;
        } catch (err) {
          set({ error: err.message, loading: false });
          console.error('Failed to create note:', err);
          throw err;
        }
      },

      updateNote: async (id, updates) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.put(`/api/notes/${id}`, updates); // Ensure correct URL
          const updatedNote = response.data;
          set({
            notes: get().notes.map((note) => (note.id === id ? updatedNote : note)),
            loading: false,
          });
          return updatedNote;
        } catch (err) {
          set({ error: err.message, loading: false });
          console.error('Failed to update note:', err);
          throw err;
        }
      },

      deleteNote: async (id) => {
        set({ loading: true, error: null });
        try {
          await axios.delete(`/api/notes/${id}`);
          set({
            notes: get().notes.filter((note) => note.id !== id),
            favorites: get().favorites.filter((note) => note.id !== id),
            loading: false,
          });
        } catch (err) {
          set({ error: err.message, loading: false });
          console.error('Failed to delete note:', err);
          throw err;
        }
      },

      toggleFavorite: (id) => {
        const notes = get().notes.map((note) =>
          note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
        );
        const favorites = notes.filter((note) => note.isFavorite);
        set({ notes, favorites });
      },

      addFolder: async (folder) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/folders', {
            ...folder,
            id: crypto.randomUUID(),
            notes: [],
          });
          const newFolder = response.data;
          set({ folders: [...get().folders, newFolder], loading: false });
          return newFolder;
        } catch (err) {
          set({ error: err.message, loading: false });
          console.error('Failed to add folder:', err);
          throw err;
        }
      },

      searchNotes: (query) => {
        const lowerCaseQuery = query.toLowerCase();
        return get().notes.filter((note) =>
          note.title.toLowerCase().includes(lowerCaseQuery) ||
          note.content.toLowerCase().includes(lowerCaseQuery) ||
          note.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
        );
      },
    }),
    {
      name: 'notes-storage',
      getStorage: () => localStorage,
    }
  )
);

export default function useNotes() {
  return useNotesStore();
}