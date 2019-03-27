import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm/SearchForm';
import SearchResults from './components/SearchResults/SearchResults';

const App = () => {
  return (
    <div className="App">
      <header>Police Department of Berlin</header>
      <SearchForm />
      <SearchResults />
    </div>
  );
};

export default App;
