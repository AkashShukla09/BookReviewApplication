const express = require('express');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Book = require('../models/Book');

const router = express.Router();

router.post('/:bookId', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    const user = await User.findById(req.user.id);

    if (user.favorites.includes(req.params.bookId)) {
      return res.status(400).json({ msg: 'Book already in favorites' });
    }

    user.favorites.push(req.params.bookId);
    await user.save();

    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:bookId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.favorites.includes(req.params.bookId)) {
      return res.status(400).json({ msg: 'Book not in favorites' });
    }

    user.favorites = user.favorites.filter(bookId => bookId.toString() !== req.params.bookId);
    await user.save();

    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
