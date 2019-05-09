import React, {useState, useEffect} from 'react';
import CreateMovie from '../CreateMovie/CreateMovie.jsx';
import MovieList from '../MovieList/MovieList.jsx'
import EditMovie from '../EditMovie/EditMovie.jsx'

function MovieContainer(props) {

  const [movies, setMovies] = useState([]);
  const [movieToEdit, setMoviesToEdit] = useState({_id: null, title: '', description: ''})
  const [modalStatus, setModalStatus] = useState(false)

  useEffect(() => {
    showAll()
  }, [])

  const addMovie = async (movie) => {
    // make request to express app
    try {

      const createdMovie = await fetch('http://localhost:9000/api/v1/movies', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = await createdMovie.json();

      setMovies(movies.concat([parsedResponse.data]));

    } catch (err) {
      console.log(err)
    };
  }

  const showAll = async () => {
    try {
      const allMovies = await fetch('http://localhost:9000/api/v1/movies')

      if (allMovies.status !== 200) {
        throw Error(allMovies.statusText)
      }

      const parsedMovies = await allMovies.json()
      setMovies(parsedMovies.data)
    } catch (err) {
      console.log(err)
    };
  }

  const closeAndEdit = async (e) => {
    e.preventDefault();

    try {

      setModalStatus(!modalStatus)

      const editedMovie = await fetch(`http://localhost:9000/api/v1/movies/${movieToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify(movieToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedMovie = await editedMovie.json();

      const updatedMovies = movies.map((movie) => {
        if (movie._id === parsedMovie.data._id) {
          return movieToEdit;
        } else {
          return movie;
        };
      });

      setMovies(updatedMovies);

    } catch (err) {
      console.log(err)
    };
  }

  const handleFormChange = (e) => {
    setMoviesToEdit({
      ...movieToEdit,
      [e.target.name]: e.target.value
    })
  }

  const showModal = (movie) => {

    setModalStatus(true)
    setMoviesToEdit(movie)
  }

  const deleteMovie = async (movie) => {

    try {

      const deletedMovie = await fetch(`http://localhost:9000/api/v1/movies/${movie._id}`, {
        method: 'DELETE',
      });

      const parsedMovie = await deletedMovie.json();

      const updatedMovies = movies.filter((movie) => {
        return movie._id !== parsedMovie.data._id
      });

      setMovies(updatedMovies)
    } catch (err) {
      console.log(err);
    };
  }

  return (<div>
    <h1>MOVIES!!!!</h1>
    <CreateMovie addMovie={addMovie}/> {modalStatus && <EditMovie closeAndEdit={closeAndEdit} handleFormChange={handleFormChange} movieToEdit={movieToEdit}/>}
    <MovieList deleteMovie={deleteMovie} showModal={showModal} movies={movies}/>
  </div>);
}

export default MovieContainer;
