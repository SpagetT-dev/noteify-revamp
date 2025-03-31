// pages/index.js
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useNotes from '../hooks/useNotes';

export default function Home() {
  const { notes, folders, createNote, deleteNote, fetchNotes, updateNote } = useNotes();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Sidebar Component
  const Sidebar = () => (
    <motion.div
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-6 shadow-2xl h-full fixed top-0 left-0 z-20 transition-all duration-300"
      initial={{ x: -250 }}
      animate={{ x: isSidebarOpen ? 0 : -250 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Folders</h2>
      <ul className="space-y-4">
        {folders.map((folder) => (
          <motion.li
            key={folder.id}
            whileHover={{ x: 5, color: '#60a5fa' }}
            className="text-lg cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-all duration-200"
          >
            {folder.name}
          </motion.li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Work</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Personal</span>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSidebarOpen(false)}
        className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        Hide Sidebar
      </motion.button>
    </motion.div>
  );

  // Navbar Component
  const Navbar = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-800 text-gray-200 shadow-lg p-4 fixed w-full z-30"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          NotesApp
        </h1>
        <div className="flex space-x-6 items-center">
          <a href="#notes" className="text-lg hover:text-blue-400 transition-colors duration-200">Notes</a>
          <a href="#folders" className="text-lg hover:text-blue-400 transition-colors duration-200">Folders</a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );

  // NoteCard Component
  const NoteCard = ({ note, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/note/${note.id}`}>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{note.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{note.content}</p>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
        {isHovered && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(note.id)}
            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200"
          >
            ×
          </motion.button>
        )}
      </motion.div>
    );
  };

  // NoteEditor Component
  const NoteEditor = ({ note, onSave }) => {
    const [content, setContent] = useState(note?.content || '');

    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
      ],
    };

    const formats = [
      'header', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
      'list', 'bullet', 'link', 'image',
    ];

    const handleSave = () => {
      if (note) {
        onSave(note.id, { ...note, content, updatedAt: new Date() });
      } else {
        createNote({ title: 'New Note', content, tags: [], isFavorite: false });
      }
      setSelectedNote(null);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl max-w-3xl mx-auto my-8 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {note ? 'Edit Note' : 'New Note'}
        </h2>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-4"
        />
        <div className="flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedNote(null)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Save
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-500 ease-in-out`}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex pt-16 h-screen overflow-hidden">
        {/* Sidebar Toggle Button */}
        {!isSidebarOpen && (
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#3b82f6' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-1/2 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
          >
            <span className="text-2xl">☰</span>
          </motion.button>
        )}

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && <Sidebar />}
        </AnimatePresence>

        {/* Main Area */}
        <main className={`flex-1 p-8 ml-0 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} overflow-y-auto transition-all duration-300`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <NoteCard note={note} onDelete={deleteNote} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* New Note Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10, backgroundColor: '#3b82f6' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedNote({ id: crypto.randomUUID(), title: 'New Note', content: '', tags: [], isFavorite: false })}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300"
          >
            <span className="text-2xl">+</span>
          </motion.button>

          {/* Note Editor */}
          <AnimatePresence>
            {selectedNote && (
              <NoteEditor
                note={selectedNote}
                onSave={updateNote}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}