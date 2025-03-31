// pages/note/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useNotes from '../../hooks/useNotes';

export default function NotePage() {
  const router = useRouter();
  const { id } = router.query; // Get the note ID from the URL
  const { notes, fetchNotes } = useNotes();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchNotes().then(() => {
        const foundNote = notes.find(n => n.id === id);
        if (foundNote) {
          setNote(foundNote);
        } else {
          setError('Note not found');
        }
        setLoading(false);
      }).catch(err => {
        setError(err.message);
        setLoading(false);
      });
    }
  }, [id, fetchNotes, notes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{note.content}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Last Updated: {new Date(note.updatedAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
}