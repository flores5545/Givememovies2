import './App.css';
import React, { useState } from 'react';

function App () {
  const [movies, setMovies] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [movie, setMovie] = useState({});
  const [show, setShow] = useState(false);

  async function handlePromptChange (event) {
    setPrompt(event.target.value);
  }

  async function handleEnter (event){
    if (event.key === 'Enter') {
      await getMovies(prompt);
      setShow(true);
    }
  }

  async function getMovies(prompt) {
    await fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })
      .then((response) => response.json())
      .then((res) => setMovies(res))
      .catch((err) => console.log(err));
  }

  async function getMovieByID(id) {
    await fetch(`http://localhost:3001/id`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then((response) => response.json())
      .then((res) => setMovie(res))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className='App'>

        <h1 className='header'>
          Give me movies
        </h1>

        <div className='body'>

          <p className='summary'>
            Give me movies is a website that uses AI to suggest movies using prompts, according to 4 different criteria: Genre, Actor, Director and Maximum watchtime. Try typing something
            like "I want to watch a rom-com which is less than 2 hours long and with Tom Hanks in it" in the box below!
          </p>

          <input className='prompt' placeholder='Insert a prompt...' onKeyUp={handlePromptChange} onKeyDown={handleEnter}></input>

          <div className='wrapper'>
            {typeof movies[0] !== 'object' &&
              <div className='tryagain'> {movies.key}</div>}

            {movies.length === 0 && show &&
              <div className='tryagain'> Could not find any movies that match your request. Try changing your prompt.</div>}


            {typeof movies[0] === 'object' && movies.length > 0 &&
              <ul className='list'>
                {movies.map(movie => (
                  <div className='movie' key={movie.id}>
                    <h3 className='title'>
                      {movie.title}
                    </h3>
                    {movie.poster_path &&
                      <img className='img' onClick={() => getMovieByID(movie.id)} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster"></img>
                    }
                    {!movie.poster_path &&
                      <p className='noimg'>This movie has no poster image</p>
                    }
                  </div>
                ))}
              </ul>}

            {movie.id &&
              <div className='movieAlone' key={movie.id}>
                <div className='imgdiv'>
                  {movie.poster_path &&
                    <img className='imgAlone' onClick={() => getMovieByID(movie.id)} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster"></img>
                  }
                  {!movie.poster_path &&
                    <p className='noimgAlone'>This movie has no poster image</p>
                  }
                </div>
                <div className='txtdiv'>
                  <h3 className='titleAlone'>
                    {movie.title}
                  </h3>
                  <p className='summary'>
                    {movie.overview}
                  </p>

                  <div className='genres'>
                    <p> Genres:
                      {movie.genres.map(genre =>
                        ' ' + genre.name + ' '
                      )}
                    </p>
                  </div>

                  <div className='year'>Published on: {movie.release_date}</div>
                  <div className='voteavg'>Vote average on IMDB: {movie.vote_average}</div>

                  <button className='back' onClick={() => setMovie({})}>Go back</button>
                </div>
              </div>

            }

          </div>

        </div>
      </div>

    </>
  );
}

export default App;
