const KEY = process.env.TMDB_API_KEY;
//const fetchAI = require('./openai');


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGE2OGI0MzllZDBiMTJlODJhY2RjZmVmNzY0ZGZlOSIsInN1YiI6IjY0YzI0N2ZjMmYxYmUwMDBlYmQ1ZTgwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxyU3SPS7zdi3do2I_QT8JWFmBvF-osud4uEq0V0gS4'
  }
};

// Find the movies that satisfy the given max runtime and ids for genre, actors and directors.
async function movieFinder(input) {
  // First we get the array of the keywords extracted by the AI
  //let data = fetchAI(input);

  let baseURL = 'https://api.themoviedb.org/3/discover/movie';
  const mockArr = ['120', 'Tom Hanks', 'Steven Spielberg', 'Action'];

  const genreID = await genreIDFinder(mockArr[3]);
  const actorID = await personIDFinder(mockArr[1]);
  const directorID = await personIDFinder(mockArr[2]);

  let runtime
  if (mockArr[0] === 'null') {
    runtime = '';
  } else {
    runtime = mockArr[0];
  }

  console.log(genreID);
  console.log(actorID);
  console.log(directorID);
  console.log(runtime);

  const movies = await fetch(baseURL + '?' + 'with_runtime.lte=' + `${runtime}&` + 'with_genres=' + `${genreID}&` + 'with_people=' + `${actorID},` + `${directorID}`, options)
    .then((movie) => movie.json())
    .catch(err => console.log(err));
  console.log(movies);
}
movieFinder()


// HELPER FUNCTIONS
// Find the id of the given genre
async function genreIDFinder(genreName) {
  if (genreName !== 'null') {
    let genreID;
    if (genreName === 'Romcom' || genreName === 'Rom-com') {
      genreID = '10749,35';
    } else if (genreName === 'Sci-fi' || genreName === 'Scifi') {
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
