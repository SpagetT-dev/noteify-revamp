import Head from "next/head";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Notes() {
  const [theme, setTheme] = useState("dark");
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedNotes = localStorage.getItem("notes");
    if (savedTheme) setTheme(savedTheme);
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const addNote = () => {
    if (newNoteTitle.trim() || newNoteContent.trim()) {
      const newNote = {
        id: Date.now(),
        title: newNoteTitle.trim() || "Untitled",
        content: newNoteContent,
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle("");
      setNewNoteContent("");
      setSelectedNote(newNote.id);
    }
  };

  const updateNote = (id, title, content) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, title, content } : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNote === id) setSelectedNote(null);
  };

  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    closed: { x: "-100%", transition: { duration: 0.5, ease: "easeIn" } },
  };

  const noteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex transition-colors duration-500`}>
      <Head>
        <title>Noteify - Notes</title>
        <meta name="description" content="The ultimate note-taking experience." />
      </Head>

      {/* Sidebar */}
      <motion.aside
        initial="open"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="w-72 bg-gray-50 dark:bg-gray-800 p-6 flex-shrink-0 shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-black dark:text-white tracking-tight"
          >
            Noteify
          </motion.h1>
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 dark:text-gray-300 text-xl"
          >
            {sidebarOpen ? "✖" : "☰"}
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={addNote}
          className="w-full bg-gray-800 dark:bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300"
        >
          + New Note
        </motion.button>
        <ul className="mt-6 space-y-3">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.li
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-300 ${selectedNote === note.id ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                onClick={() => setSelectedNote(note.id)}
              >
                {note.title}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-100 dark:bg-gray-900 py-4 z-10">
          <h2 className="text-3xl font-semibold text-black dark:text-white">Notes</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-500"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </motion.button>
        </div>

        {/* Note Editor */}
        {selectedNote ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {notes
              .filter((note) => note.id === selectedNote)
              .map((note) => (
                <div key={note.id}>
                  <input
                    type="text"
                    value={note.title}
                    onChange={(e) => updateNote(note.id, e.target.value, note.content)}
                    placeholder="Untitled"
                    className="w-full p-2 mb-6 text-3xl font-bold bg-transparent text-black dark:text-white focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
                  />
                  <ReactQuill
                    value={note.content}
                    onChange={(content) => updateNote(note.id, note.title, content)}
                    modules={quillModules}
                    theme="snow"
                    className="bg-transparent text-black dark:text-white editor-clean"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteNote(note.id)}
                    className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
                  >
                    Delete Note
                  </motion.button>
                </div>
              ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Note Title"
              className="w-full p-2 mb-6 text-3xl font-bold bg-transparent text-black dark:text-white focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
            />
            <ReactQuill
              value={newNoteContent}
              onChange={setNewNoteContent}
              modules={quillModules}
              theme="snow"
              placeholder="Start typing your note..."
              className="bg-transparent text-black dark:text-white editor-clean"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={addNote}
              className="mt-6 bg-gray-800 dark:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300"
            >
              Save Note
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Integrated Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #d1d5db; /* Light mode scrollbar track */
        }

        .dark ::-webkit-scrollbar-track {
          background: #374151; /* Dark mode scrollbar track */
        }

        ::-webkit-scrollbar-thumb {
          background: #6b7280; /* Light mode scrollbar thumb */
          border-radius: 3px;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: #4b5563; /* Dark mode scrollbar thumb */
        }

        .ql-toolbar.ql-snow {
          background: #f3f4f6; /* Light mode toolbar */
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .dark .ql-toolbar.ql-snow {
          background: #1f2937; /* Dark mode toolbar */
        }

        .ql-container.ql-snow {
          border: none;
          background: transparent;
        }

        .editor-clean .ql-container {
          background: transparent !important;
        }

        .ql-editor {
          min-height: 300px;
          padding: 0;
          font-size: 1.125rem;
          line-height: 1.75;
          color: #000000; /* Light mode text */
        }

        .dark .ql-editor {
          color: #ffffff; /* Dark mode text */
        }

        .ql-editor::before {
          color: #9ca3af; /* Light mode placeholder */
          font-style: normal;
        }

        .dark .ql-editor::before {
          color: #6b7280; /* Dark mode placeholder */
        }
      `}</style>
    </div>
  );
}