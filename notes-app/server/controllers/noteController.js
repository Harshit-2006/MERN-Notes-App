const mongoose = require('mongoose');
const Note = require('../models/Note');

// @desc    Create a new note
// @route   POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content, category, tags, isPinned } = req.body;

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    if (title.length > 120) {
      return res.status(400).json({
        success: false,
        message: 'Title cannot exceed 120 characters'
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
      tags,
      isPinned
    });

    res.status(201).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not create note'
    });
  }
};

// @desc    Get all notes
// @route   GET /api/notes
const getNotes = async (req, res) => {
  try {
    // Sort by isPinned (true first) and then by updatedAt (newest first)
    const notes = await Note.find({}).sort({ isPinned: -1, updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch notes'
    });
  }
};

// @desc    Get single note by ID
// @route   GET /api/notes/:id
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID'
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch note'
    });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags, isPinned } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID'
      });
    }

    // Basic validation for updates
    if (title && title.length > 120) {
      return res.status(400).json({
        success: false,
        message: 'Title cannot exceed 120 characters'
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Update fields
    note.title = title || note.title;
    note.content = content || note.content;
    
    if (category !== undefined) note.category = category;
    if (tags !== undefined) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    const updatedNote = await note.save();

    res.status(200).json({
      success: true,
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not update note'
    });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID'
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not delete note'
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};
