import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';

const FavoriteBooks = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    axios.get('http://localhost:5001/api/favorites', {
      headers: {
        'x-auth-token': token
      }
    })
      .then(response => {
        setFavorites(response.data.favorites);
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="content">
        <Button
          type="primary"
          onClick={handleBackClick}
          style={{ marginBottom: '20px' }}
        >
          Back to Book List
        </Button>
        <div className="book-list">
          {favorites.length > 0 ? (
            favorites.map(book => (
              <Link to={`/book/${book._id}`} key={book._id} className="book-card">
                <Card cover={<img alt={book.title} src="cover.png" />}>
                  <Card.Meta
                    title={book.title}
                    description={book.author}
                  />
                </Card>
              </Link>
            ))
          ) : (
            <div>No favorite books available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteBooks;
