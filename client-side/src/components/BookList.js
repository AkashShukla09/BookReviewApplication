import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Select, Pagination, Button } from 'antd';

const { Option } = Select;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const booksPerPage = 5;
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    fetchBooks(searchQuery, currentPage, sortCriteria);
    fetchFavorites();
  }, [currentPage, sortCriteria, searchQuery]);

  const fetchBooks = (query, page, sort) => {
    axios.get(`http://localhost:5001/api/books`, {
      params: {
        search: query,
        page: page,
        limit: booksPerPage,
        sortBy: sort,
        order: 'asc'
      }
    })
      .then(response => {
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  };

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

  const handleSortChange = (value) => {
    setSortCriteria(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    fetchBooks(searchQuery, 1, sortCriteria);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBooks(searchQuery, page, sortCriteria);
  };

  const handleFavoriteClick = (bookId) => {
    const isFavorite = favorites.includes(bookId);

    if (isFavorite) {
      axios.delete(`http://localhost:5001/api/favorites/${bookId}`, {
        headers: {
          'x-auth-token': token
        }
      })
        .then(() => {
          setFavorites(favorites.filter(id => id !== bookId));
        })
        .catch(error => {
          console.error('Error removing favorite:', error);
        });
    } else {
      axios.post(`http://localhost:5001/api/favorites/${bookId}`, {}, {
        headers: {
          'x-auth-token': token
        }
      })
        .then(() => {
          setFavorites([...favorites, bookId]);
        })
        .catch(error => {
          console.error('Error adding favorite:', error);
        });
    }
  };

  return (
    <div className="page-container">
      <div className="content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, author, or genre"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="ant-btn ant-btn-primary"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        <div className="sort-bar">
          <span>Sort by: </span>
          <Select value={sortCriteria} onChange={handleSortChange}>
            <Option value="averageRating">Average Rating</Option>
            <Option value="title">Title</Option>
            <Option value="author">Author</Option>
          </Select>
        </div>
        <div className="book-list">
          {books.length > 0 ? (
            books.map(book => (
              <Link to={`/book/${book._id}`} key={book._id} className="book-card">
                <Card cover={<img alt={book.title} src="cover.png" />}>
                  <Card.Meta
                    title={book.title}
                    description={book.author}
                  />
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavoriteClick(book._id);
                    }}
                  >
                    {favorites.includes(book._id) ? 'Remove from Favorite' : 'Add to Favorite'}
                  </Button>
                </Card>
              </Link>
            ))
          ) : (
            <div>No books available</div>
          )}
        </div>
      </div>
      <div className="pagination-bar">
        <Pagination
          current={currentPage}
          pageSize={booksPerPage}
          total={totalPages * booksPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          simple
        />
      </div>
    </div>
  );
};

export default BookList;

