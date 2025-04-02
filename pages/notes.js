import Head from "next/head";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import React from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence, useScroll, useTransform, useAnimationControls } from "framer-motion";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { loadFull } from "tsparticles";
import { FaSearch, FaTag, FaPin, FaDownload, FaUpload, FaMicrophone, FaPalette } from "react-icons/fa";
import debounce from "lodash/debounce"; // Install lodash for debounce

// Dynamic imports
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const ParticlesDynamic = dynamic(() => import("react-tsparticles"), { ssr: false });

// Memoized Particles component
const ParticlesBackground = ({ theme }) => {
  const particleRef = useRef(null);

  const particlesInit = async (engine) => {
    await loadFull(engine);
    particleRef.current = engine;
  };

  const particlesLoaded = (container) => {
    console.log("Particles loaded", container);
  };

  const particleOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: { value: theme === "dark" ? "#0A1D37" : "#E6F0FA" } },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: { onClick: { enable: true, mode: "push" }, onHover: { enable: true, mode: "repulse" }, resize: true },
        modes: { push: { quantity: 4 }, repulse: { distance: 100, duration: 0.4 } },
      },
      particles: {
        color: { value: theme === "dark" ? "#4CAF50" : "#1E90FF" },
        links: { color: theme === "dark" ? "#4CAF50" : "#1E90FF", distance: 150, enable: true, opacity: 0.3, width: 1 },
        collisions: { enable: true },
        move: { direction: "none", enable: true, outMode: "bounce", random: false, speed: 1, straight: false },
        number: { density: { enable: true, area: 800 }, value: 50 },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 4 } },
      },
      detectRetina: true,
    }),
    [theme]
  );

  return (
    <ParticlesDynamic
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleOptions}
      className="absolute inset-0 z-[-1]"
    />
  );
};

const MemoizedParticlesBackground = React.memo(ParticlesBackground);

export default function Notes() {
  const [theme, setTheme] = useState("dark");
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteTags, setNewNoteTags] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [recording, setRecording] = useState(false);
  const [template, setTemplate] = useState("default");
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedNotes = localStorage.getItem("notes");
    if (savedTheme) setTheme(savedTheme);
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const debouncedSaveNotes = useCallback(
    debounce((updatedNotes) => {
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSaveNotes(notes);
  }, [notes, debouncedSaveNotes]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }, { font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "code-block"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const addNote = () => {
    if (newNoteTitle.trim() || newNoteContent.trim()) {
      const newNote = {
        id: Date.now(),
        title: newNoteTitle.trim() || "Untitled",
        content: newNoteContent,
        tags: newNoteTags,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        pinned: false,
        wordCount: newNoteContent.split(/\s+/).filter(Boolean).length,
        audio: null,
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle("");
      setNewNoteContent("");
      setNewNoteTags([]);
      setSelectedNote(newNote.id);
    }
  };

  const updateNote = (id, title, content, tags = null) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              content,
              tags: tags !== null ? tags : note.tags,
              modifiedAt: new Date().toISOString(),
              wordCount: content.split(/\s+/).filter(Boolean).length,
            }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNote === id) setSelectedNote(null);
  };

  const pinNote = (id) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, pinned: !note.pinned } : note)));
  };

  const exportNotes = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "notes.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importNotes = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedNotes = JSON.parse(event.target.result);
          setNotes([...notes, ...importedNotes]);
        } catch (error) {
          alert("Error importing notes: Invalid JSON");
        }
      };
      reader.readAsText(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => audioChunksRef.current.push(event.data);
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (selectedNote) {
          setNotes(
            notes.map((note) =>
              note.id === selectedNote ? { ...note, audio: audioUrl, modifiedAt: new Date().toISOString() } : note
            )
          );
        } else {
          const newNote = {
            id: Date.now(),
            title: "Voice Note " + new Date().toLocaleString(),
            content: "",
            tags: ["voice"],
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
            pinned: false,
            wordCount: 0,
            audio: audioUrl,
          };
          setNotes([...notes, newNote]);
          setSelectedNote(newNote.id);
        }
        audioChunksRef.current = [];
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Failed to start recording. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const applyTemplate = (type) => {
    setTemplate(type);
    switch (type) {
      case "meeting":
        setNewNoteContent("<h2>Meeting Notes</h2><p><strong>Date:</strong> <br><strong>Attendees:</strong> <br><strong>Agenda:</strong> <ul><li></li></ul></p>");
        break;
      case "todo":
        setNewNoteContent("<h2>To-Do List</h2><ul><li>[ ] Task 1</li><li>[ ] Task 2</li></ul>");
        break;
      default:
        setNewNoteContent("");
    }
  };

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => (b.pinned - a.pinned) || new Date(b.modifiedAt) - new Date(a.modifiedAt));

  const sidebarVariants = {
    open: { x: 0, width: "20rem", transition: { duration: 0.5, ease: "easeOut" } },
    closed: { x: "-100%", width: 0, transition: { duration: 0.5, ease: "easeIn" } },
  };

  const noteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-700 ${theme === "dark" ? "bg-gradient-to-br from-[#0A1D37] via-[#1A4068] to-[#2D5F8B]" : "bg-gradient-to-br from-[#E6F0FA] via-[#F0F5FF] to-[#D1E0F0]"} relative text-black dark:text-white flex font-sans`}>
      <Head>
        <title>Noteify - Ultimate Notes</title>
        <meta name="description" content="The most detailed and feature-rich notes app ever." />
      </Head>

      <MemoizedParticlesBackground theme={theme} />

      {/* Sidebar */}
      <motion.aside
        initial="open"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="bg-gradient-to-b from-gray-100/90 to-gray-200/90 dark:from-gray-800/90 dark:to-gray-900/90 p-6 flex-shrink-0 shadow-2xl z-20 backdrop-blur-lg overflow-y-auto max-h-screen"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            whileHover={{ scale: 1.05, color: theme === "dark" ? "#4CAF50" : "#1E90FF" }}
            className="text-3xl font-extrabold tracking-tight"
          >
            Noteify
          </motion.h1>
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl"
          >
            {sidebarOpen ? "✖" : "☰"}
          </motion.button>
        </div>

        <motion.div
          className="flex items-center bg-white/20 dark:bg-gray-700/20 p-2 rounded-lg mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <FaSearch className="mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-transparent focus:outline-none"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={addNote}
          className="w-full bg-gradient-to-r from-[#1E90FF] to-[#4CAF50] text-white py-3 rounded-xl font-semibold shadow-md hover:from-[#1864AB] hover:to-[#3D8B40] transition-all duration-300 mb-4"
        >
          + New Note
        </motion.button>

        <div className="flex flex-wrap gap-2 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportNotes}
            className="flex-1 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg flex items-center justify-center"
          >
            <FaDownload className="mr-1" /> Export
          </motion.button>
          <label className="flex-1 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg flex items-center justify-center cursor-pointer">
            <FaUpload className="mr-1" /> Import
            <input type="file" accept=".json" onChange={importNotes} className="hidden" />
          </label>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">Template:</label>
          <select
            value={template}
            onChange={(e) => applyTemplate(e.target.value)}
            className="w-full bg-white/20 dark:bg-gray-700/20 p-2 rounded-lg focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="meeting">Meeting Notes</option>
            <option value="todo">To-Do List</option>
          </select>
        </div>

        <ul className="space-y-3">
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <motion.li
                key={note.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={noteVariants}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${selectedNote === note.id ? "bg-gradient-to-r from-[#1E90FF]/20 to-[#4CAF50]/20 shadow-md" : "bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20"}`}
                onClick={() => setSelectedNote(note.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold truncate max-w-[14rem]">{note.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(note.modifiedAt).toLocaleString()} • {note.wordCount} words
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {note.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-300/50 dark:bg-gray-600/50 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); pinNote(note.id); }}
                    className={`text-xl ${note.pinned ? "text-yellow-400" : "text-gray-400"}`}
                  >
                    <FaPin />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto z-20">
        <motion.div
          className="flex justify-between items-center mb-6 sticky top-0 bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-900/80 dark:to-gray-800/80 py-4 px-6 rounded-xl shadow-lg z-30 backdrop-blur-lg"
          style={{ y: parallaxY }}
        >
          <h2 className="text-4xl font-bold tracking-tight">Notes</h2>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-full bg-white/20 dark:bg-gray-700/20 text-2xl shadow-md"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white/20 dark:bg-gray-700/20 text-2xl shadow-md"
              onClick={recording ? stopRecording : startRecording}
            >
              <FaMicrophone className={recording ? "text-red-500 animate-pulse" : ""} />
            </motion.button>
          </div>
        </motion.div>

        {/* Note Editor */}
        {selectedNote ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={noteVariants}
            className="max-w-4xl mx-auto bg-white/10 dark:bg-gray-900/10 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 dark:border-gray-700/10"
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
                    className="w-full p-4 mb-6 text-4xl font-bold bg-transparent focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 border-b border-gray-300/50 dark:border-gray-600/50 transition-all duration-300"
                  />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map((tag) => (
                      <span key={tag} className="bg-gradient-to-r from-[#1E90FF]/20 to-[#4CAF50]/20 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add tag..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          updateNote(note.id, note.title, note.content, [...note.tags, e.target.value.trim()]);
                          e.target.value = "";
                        }
                      }}
                      className="bg-transparent p-1 text-sm focus:outline-none border-b border-gray-300/50 dark:border-gray-600/50"
                    />
                  </div>
                  <ReactQuill
                    value={note.content}
                    onChange={(content) => updateNote(note.id, note.title, content)}
                    modules={quillModules}
                    theme="snow"
                    className="bg-transparent text-black dark:text-white editor-clean rounded-lg shadow-inner"
                    placeholder="Start typing your note..."
                  />
                  {note.audio && (
                    <audio controls src={note.audio} className="mt-4 w-full rounded-lg shadow-md" />
                  )}
                  <div className="flex justify-between items-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                    <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
                    <p>Modified: {new Date(note.modifiedAt).toLocaleString()}</p>
                    <p>{note.wordCount} words</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(220, 38, 38, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteNote(note.id)}
                    className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 shadow-md"
                  >
                    Delete Note
                  </motion.button>
                </div>
              ))}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={noteVariants}
            className="max-w-4xl mx-auto bg-white/10 dark:bg-gray-900/10 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 dark:border-gray-700/10"
          >
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Note Title"
              className="w-full p-4 mb-6 text-4xl font-bold bg-transparent focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 border-b border-gray-300/50 dark:border-gray-600/50 transition-all duration-300"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {newNoteTags.map((tag) => (
                <span key={tag} className="bg-gradient-to-r from-[#1E90FF]/20 to-[#4CAF50]/20 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
              <input
                type="text"
                placeholder="Add tag..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    setNewNoteTags([...newNoteTags, e.target.value.trim()]);
                    e.target.value = "";
                  }
                }}
                className="bg-transparent p-1 text-sm focus:outline-none border-b border-gray-300/50 dark:border-gray-600/50"
              />
            </div>
            <ReactQuill
              value={newNoteContent}
              onChange={setNewNoteContent}
              modules={quillModules}
              theme="snow"
              placeholder="Start typing your note..."
              className="bg-transparent text-black dark:text-white editor-clean rounded-lg shadow-inner"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={addNote}
              className="mt-6 bg-gradient-to-r from-[#1E90FF] to-[#4CAF50] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1864AB] hover:to-[#3D8B40] transition-all duration-300 shadow-md"
            >
              Save Note
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Roboto+Mono:wght@400;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.5);
          border-radius: 4px;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
        }

        .ql-toolbar.ql-snow {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          padding: 12px;
          border-radius: 12px 12px 0 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          backdrop-blur-md;
        }

        .dark .ql-toolbar.ql-snow {
          background: rgba(31, 41, 55, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .ql-container.ql-snow {
          border: none;
          background: transparent;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .dark .ql-container.ql-snow {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .editor-clean .ql-container {
          background: transparent !important;
        }

        .ql-editor {
          min-height: 400px;
          padding: 20px;
          font-size: 1.25rem;
          line-height: 1.8;
          color: #000000;
          background: transparent;
          font-family: 'Roboto Mono', monospace;
        }

        .dark .ql-editor {
          color: #ffffff;
        }

        .ql-editor::before {
          color: #9ca3af;
          font-style: normal;
          font-family: 'Inter', sans-serif;
        }

        .dark .ql-editor::before {
          color: #6b7280;
        }

        @media (max-width: 768px) {
          aside {
            position: fixed;
            height: 100vh;
            width: 16rem !important;
          }
          main {
            padding: 4rem 1rem 1rem;
          }
          .ql-editor {
            min-height: 300px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}