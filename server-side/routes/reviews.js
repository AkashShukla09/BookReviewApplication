const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const Review = require('../models/Reviews');
const Book = require('../models/Book');
const router = express.Router();

router.post(
  '/',
  [
    auth,
    [
      check('bookId', 'Book ID is required').not().isEmpty(),
      check('rating', 'Rating is required').isInt({ min: 1, max: 5 }),
      check('comment', 'Comment is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookId, rating, comment } = req.body;

    try {
      // Check if the book exists
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ msg: 'Book not found' });
      }

      // Check if the user has already reviewed the book
      let review = await Review.findOne({ book: bookId, user: req.user.id });

      if (review) {
        // Update the existing review
        review.rating = rating;
        review.comment = comment;
        review = await review.save();
      } else {
        // Create a new review
        review = new Review({
          book: bookId,
          user: req.user.id,
          rating,
          comment,
        });

        review = await review.save();
        // Add the review to the book's reviews array
        book.reviews.push(review._id);
      }

      // Calculate the new average rating for the book
      const reviews = await Review.find({ book: bookId });
      const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

      book.averageRating = parseFloat(averageRating);
      await book.save();

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;