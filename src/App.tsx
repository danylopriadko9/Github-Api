import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import FavoritesPages from './pages/FavoritePages';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favorite' element={<FavoritesPages />} />
      </Routes>
    </>
  );
};

export default App;
