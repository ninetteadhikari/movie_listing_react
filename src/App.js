import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar';

class App extends Component {
  state = {
    movieList: []
  };

  componentDidMount() {
    for (let i = 1; i <= 10; i++) {
      axios
        .get(
          `http://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${i}`
        )
        .then(response => {
          this.setState(state => {
            const movieList = state.movieList.concat(response.data.results);
            return {
              movieList
            };
          });
        });
    }
  }

  render() {
    const nameList = this.state.movieList.map(movie => {
      return movie.original_title;
    });
    return (
      <div className='App'>
        {console.log('movie list', this.state.movieList)}
        <h1>Movie Listing</h1>
        <SearchBar suggestions={nameList} movieList={this.state.movieList} />
      </div>
    );
  }
}

export default App;
