import React, { Component } from 'react';
import MovieList from './MovieList';

class SearchBar extends Component {
  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ''
  };

  onChange = e => {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = this.props.suggestions.filter(suggestion => {
      return suggestion.toLowerCase().includes(userInput.toLowerCase());
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
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

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
                <li className={className} key={suggestion} onClick={onClick}>
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

    return (
      <div>
        <h3 className='search-title'>Search for your favorite movies</h3>
        <input
          className='input-item'
          type='text'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder='Type movie names here'
        />
        {suggestionsListComponent}
        <div className='suggestion-container'>
          <MovieList userInput={userInput} movieList={this.props.movieList} />
        </div>
      </div>
    );
  }
}

export default SearchBar;
