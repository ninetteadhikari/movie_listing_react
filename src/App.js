import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar';

class App extends Component {
  state = {
    movieList: []
  };

  componentDidMount() {
    axios
      .get(
        `http://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(response => {
        this.setState({
          movieList: response.data.results
        });
      });
  }

  render() {
   const nameList = this.state.movieList.map(movie => {
      return movie.original_title;
    });
    return (
      <div className='App'>
        <h1>Movie Listing</h1>
        <SearchBar suggestions={nameList} movieList={this.state.movieList}/>
        
      </div>
    );
  }
}

export default App;
