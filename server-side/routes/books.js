const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews');

        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    const { title, author, genre, description } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            genre,
            description
        });

        const book = await newBook.save();
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



router.get('/', async (req, res) => {
    const { page = 1, limit = 10, search = '', sortBy = 'title', order = 'asc' } = req.query;

  
    try {
      const query = search ? { $or: [{ title: { $regex: search, $options: 'i' } }, { author: { $regex: search, $options: 'i' } }] } : {};
  
      const sortCriteria = {};
      sortCriteria[sortBy] = order === 'asc' ? 1 : -1;
  
      const books = await Book.find(query)
        .sort(sortCriteria)
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
  
      const total = await Book.countDocuments(query);

  
      res.json({
        books,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
