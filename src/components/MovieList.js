import React, { Component } from 'react';

export default class MovieList extends Component {
  render() {
    let selectedMovie;
      selectedMovie = this.props.movieList.filter(data => {
        return data.original_title
          .toLowerCase()
          .includes(this.props.userInput.toLowerCase());
      });

    return (
      <>
        {selectedMovie.map(movie => {
          return (
            <div key={movie.id} className='movie-item'>
              <img
                src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt='movie poster'
              />
              <h3>{movie.original_title}</h3>
              <h4>Rating: {movie.vote_average}</h4>
            </div>
          );
        })}
      </>
    );
  }
}
