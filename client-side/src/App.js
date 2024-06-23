import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import FavoriteBooks from './components/FavoriteBooks'

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/books" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={isAuthenticated ? <BookList /> : <Navigate to="/login" />} />
        <Route path="/book/:id" element={isAuthenticated ? <BookDetails /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={<FavoriteBooks />} />
      </Routes>
    </Router>
  );
};

export default App;



