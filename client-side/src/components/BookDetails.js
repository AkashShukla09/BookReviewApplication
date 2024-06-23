import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Rate, List, message } from 'antd';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, [id]); // Fetch book details whenever ID changes

  const fetchBookDetails = () => {
    setLoading(true);
    axios.get(`http://localhost:5001/api/books/${id}`)
      .then(response => {
        console.log(response.data);
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  };

  const handleReviewSubmit = (review) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    axios.post('http://localhost:5001/api/reviews', {
      bookId: book._id,
      rating: review.rating,
      comment: review.comment,
    }, {
      headers: {
        'x-auth-token': token
      }
    })
    .then(response => {
      message.success('Review submitted successfully!');
      // Refetch book details to update with new review
      fetchBookDetails();
    })
    .catch(error => {
      message.error('Failed to submit review. Please try again.');
      console.error('Review submission error:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-details">
      <Card title={book.title}>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Average Rating:</strong> <Rate disabled value={book.averageRating} /></p>
      </Card>
      <h2>User Reviews</h2>
      <List
        dataSource={book.reviews}
        renderItem={review => (
          <List.Item key={review._id}>
            <Rate disabled value={review.rating} />
            <p>{review.comment}</p>
          </List.Item>
        )}
      />
      <div className="review-form">
        <ReviewForm bookId={book._id} onReviewSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
};

export default BookDetails;
