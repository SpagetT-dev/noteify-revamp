// pages/api/notes.js
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req, res) {
  const { method, query, body } = req;

  // Mock in-memory store (replace with a database in production)
  let notes = [];
  if (typeof localStorage !== 'undefined') {
    const storedNotes = localStorage.getItem('notes');
    notes = storedNotes ? JSON.parse(storedNotes) : [];
  }

  switch (method) {
    case 'GET':
      res.status(200).json({ notes, folders: [] });
      break;
    case 'POST':
      const newNote = {
        id: body.id || crypto.randomUUID(),
        title: body.title || 'Untitled',
        content: body.content || '',
        tags: body.tags || [],
        isFavorite: body.isFavorite || false,
        createdAt: body.createdAt || new Date(),
        updatedAt: new Date(),
      };
      notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(notes));
      res.status(201).json(newNote);
      break;
    case 'PUT':
      const { id } = query;
      const noteIndex = notes.findIndex((note) => note.id === id);
      if (noteIndex === -1) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        notes[noteIndex] = { ...notes[noteIndex], ...body, updatedAt: new Date() };
        localStorage.setItem('notes', JSON.stringify(notes));
        res.status(200).json(notes[noteIndex]);
      }
      break;
    case 'DELETE':
      const deleteIndex = notes.findIndex((note) => note.id === query.id);
      if (deleteIndex === -1) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        notes.splice(deleteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        res.status(204).end();
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}