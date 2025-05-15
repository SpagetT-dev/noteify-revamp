
import React, { createContext, useContext, useState, useMemo } from 'react';
import { toast } from "sonner";

// Initial demo data
const initialCategories = [
  { id: 'personal', name: 'Personal', color: 'blue' },
  { id: 'work', name: 'Work', color: 'green' },
  { id: 'ideas', name: 'Ideas', color: 'purple' },
  { id: 'todo', name: 'Todo', color: 'red' },
];

const initialNotes = [
  {
    id: '1',
    title: 'Welcome to LuminousNotes',
    content: 'This is your new favorite note-taking app. Try creating a new note or organizing your thoughts into categories.',
    categoryId: null,
    isPinned: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Meeting Notes',
    content: '- Discuss project timeline\n- Review budget\n- Plan next steps',
    categoryId: 'work',
    isPinned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Grocery List',
    content: '- Milk\n- Eggs\n- Bread\n- Fruits',
    categoryId: 'personal',
    isPinned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'App Idea',
    content: 'Create a mobile app that helps users track their daily water intake and reminds them to stay hydrated throughout the day.',
    categoryId: 'ideas',
    isPinned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  // State
  const [notes, setNotes] = useState(initialNotes);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  // Memoized filtered notes for performance
  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => {
        const matchesCategory = activeCategory === null || note.categoryId === activeCategory;
        const matchesSearch = searchQuery === '' || 
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          note.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        // Sort by pinned status first (pinned notes come first), then by updatedAt (newest first)
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [notes, activeCategory, searchQuery]);

  // Create a new note
  const createNote = () => {
    const newNote = {
      id: Math.random().toString(36).substring(2, 9), // Unique ID
      title: 'Untitled Note',
      content: '',
      categoryId: activeCategory || null, // Default to null if no active category
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]); // Use functional update
    setSelectedNote(newNote);
    toast.success("New note created");
  };

  // Update a note
  const updateNote = (updatedNote) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === updatedNote.id ? { ...note, ...updatedNote, updatedAt: new Date() } : note
      )
    );
    
    if (selectedNote?.id === updatedNote.id) {
      setSelectedNote(prev => ({ ...prev, ...updatedNote, updatedAt: new Date() }));
    }
    
    toast.success("Note updated");
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
    toast.success("Note deleted");
  };

  // Select a note
  const selectNote = (id) => {
    if (id === null || id === undefined) {
      setSelectedNote(null);
      return;
    }
    const note = notes.find(note => note.id === id);
    setSelectedNote(note || null);
    if (!note) {
      console.warn(`Note with ID ${id} not found`);
    }
  };

  // Toggle pin status of a note
  const togglePinNote = (id) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, isPinned: !note.isPinned, updatedAt: new Date() } : note
      )
    );
    
    if (selectedNote?.id === id) {
      setSelectedNote(prev => ({
        ...prev,
        isPinned: !prev.isPinned,
        updatedAt: new Date(),
      }));
    }
    
    const note = notes.find(n => n.id === id);
    toast.success(note?.isPinned ? "Note unpinned" : "Note pinned");
  };

  // Create a category
  const createCategory = (name, color) => {
    if (!name.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    const newCategory = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      color: color || 'blue', // Default to blue if no color provided
    };

    setCategories(prevCategories => [...prevCategories, newCategory]);
    toast.success("Category created");
  };

  // Delete a category
  const deleteCategory = (id) => {
    if (!categories.find(cat => cat.id === id)) {
      toast.error("Category not found");
      return;
    }

    setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
    
    // Update notes to remove category association
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.categoryId === id ? { ...note, categoryId: null, updatedAt: new Date() } : note
      )
    );
    
    if (activeCategory === id) {
      setActiveCategory(null);
    }
    
    toast.success("Category deleted");
  };

  const value = {
    notes,
    categories,
    selectedNote,
    searchQuery,
    activeCategory,
    filteredNotes,
    setSearchQuery,
    setActiveCategory,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    togglePinNote,
    createCategory,
    deleteCategory,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};