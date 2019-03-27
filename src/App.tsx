import React, { Component } from 'react';
import './App.css';
import Card  from "./components/Card/Card";
import SearchForm  from "./components/SearchForm/SearchForm";
import SearchResults  from "./components/SearchResults/SearchResults";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>Police Department of Berlin</header>
        <SearchForm/>
        <SearchResults/>
      </div>
    );
  }
}

export default App;
