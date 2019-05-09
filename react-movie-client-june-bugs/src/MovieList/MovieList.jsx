import React from 'react';

function MovieList(props){

  const reversedMovies = props.movies.slice(0).reverse()

  const movieList = reversedMovies.map((movie) => {
    return(
      <li key={movie._id}>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p><br/>
        <button onClick={() => props.deleteMovie(movie)}>Delete</button>
        <button onClick={() => props.showModal(movie)} >Edit</button>
      </li>
    );
  });

  return(
    <ul>
      {movieList}
    </ul>
  );
}

export default MovieList;
