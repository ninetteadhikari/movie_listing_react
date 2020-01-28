import React, { Component } from 'react';
import MovieList from './MovieList';

class SearchBar extends Component {
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      userInput,
      movieList,
      initialList
    } = this.props;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className='suggestions'>
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = 'suggestion-active';
              }
              return (
                <li className={className} key={suggestion} onClick={e=>onClick(e)}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className='no-suggestions'>
            <em>No suggestions</em>
          </div>
        );
      }
    }

    let selectedMovies = movieList.filter(data => {
        return data.original_title
          .toLowerCase()
          .includes(userInput.toLowerCase());
      });
    
      let finalMovie = movieList.filter(data => {
        return data.original_title
          .toLowerCase()
          ===(userInput.toLowerCase());
      });

    return (
      <div>
      {console.log('final movie', finalMovie)}
      {console.log('selected movie', selectedMovies)}
        <h3 className='search-title'>Search for your favorite movies</h3>
        <input
          className='input-item'
          type='text'
          onChange={e=>onChange(e)}
          onKeyDown={e=>onKeyDown(e)}
          value={userInput}
          placeholder='Type movie names here'
        />
        {suggestionsListComponent}
        <div className='suggestion-container'>
        {movieList.length===0 ? 
          <MovieList
            selectedMovie={initialList}
          />
          
          :<MovieList
            selectedMovie={selectedMovies}
          />
        }
        </div>
      </div>
    );
  }
}

export default SearchBar;
