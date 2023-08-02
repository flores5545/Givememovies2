const KEY = process.env.TMDB_API_KEY;
const fetchAI = require('./openai');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${KEY}`
  }
};

// Find the movies that satisfy the given max runtime and ids for genre, actors and directors.
async function movieFinder(prompt) {
  // First we get the array of the keywords extracted by the AI
  let data = await fetchAI(prompt);

  if (!data.some((el) => el !== 'null') || data.length < 3 || typeof data === 'string') {
    return { key: 'Could not find any movies that match your request. Try changing your prompt.' }
  }

  let baseURL = 'https://api.themoviedb.org/3/discover/movie';

  const genreID = await genreIDFinder(data[3]);
  const actorID = await personIDFinder(data[1]);
  const directorID = await personIDFinder(data[2]);
  let runtime;

  if (data[0] === 'null') {
    runtime = '';
  } else {
    runtime = data[0];
  }

  const movies = await fetch(`${baseURL}?with_runtime.lte=${runtime}&with_genres=${genreID}&with_people=${actorID},${directorID}`, options)
    .then((movie) => movie.json())
    .catch(err => console.log(err));
  return movies.results;
}


// Find the movie by ID to display its details
async function movieFinderByID(ID) {
  let baseURL = 'https://api.themoviedb.org/3/movie/'

  const movie = await fetch(baseURL + `${ID}`, options)
    .then((movie) => movie.json())
    .catch(err => console.log(err));
  return movie;
}

// HELPER FUNCTIONS
// Find the id of the given genre
async function genreIDFinder(genreName) {
  if (genreName !== 'null') {
    let genreID;
    if (genreName.toLowerCase() === 'romcom' || genreName.toLowerCase() === 'rom-com') {
      genreID = '10749,35';
    } else if (genreName === 'sci-fi' || genreName === 'scifi') {
      genreID = '878';
    } else {
      // Get list of genres
      const genreList = await fetch('https://api.themoviedb.org/3/genre/movie/list', options)
        .then((genre) => genre.json())
        .catch(err => console.log(err));

      // Find the genre with the same name as the given genre and extract its id
      for (let genre of genreList.genres) {
        if (genre.name === genreName) {
          genreID = genre.id;
        }
      }
    }
    return genreID;
  }
  return '';
}

// Find the id of the given Actor/Director
async function personIDFinder(personName) {
  if (personName !== 'null') {
    const people = await fetch(`https://api.themoviedb.org/3/search/person?query=${personName}`, options)
      .then((person) => person.json())
      .catch(err => console.log(err));
    const personId = people.results[0].id;
    return personId;
  }
  return;
}



module.exports = { movieFinder, movieFinderByID };