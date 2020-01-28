import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar';

class App extends Component {
  state = {
    initialList: [],
    movieList: [],
    userInput: '',
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false
  };

  componentDidMount() {
    axios
      .get(
        `http://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(response => {
        this.setState({
          initialList: response.data.results
        });
      });
  }

  getMovie = userInput => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${userInput}`
      )
      .then(response => {
        this.setState({
          movieList: response.data.results
        });
      });
  };

  onChange = e => {
    const userInput = e.currentTarget.value;
    this.getMovie(userInput);
    const filteredSuggestions = this.state.movieList
      .map(movie => {
        return movie.original_title;
      })
      .filter(suggestion => {
        return suggestion
      });
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    // User presses enter
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User presses up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({
        activeSuggestion: activeSuggestion - 1
      });
    }
    // User presses down
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({
        activeSuggestion: activeSuggestion + 1
      });
    }
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  render() {
    return (
      <div className='App'>
        {console.log('movie list', this.state.movieList)}
        {console.log('filter list', this.state.filteredSuggestions)}
        <h1>Movie Listing</h1>
        <SearchBar
          activeSuggestion={this.state.activeSuggestion}
          filteredSuggestions={this.state.filteredSuggestions}
          showSuggestions={this.state.showSuggestions}
          userInput={this.state.userInput}
          movieList={this.state.movieList}
          onChange={this.onChange}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          initialList={this.state.initialList}
        />
      </div>
    );
  }
}

export default App;
