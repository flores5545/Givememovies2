require('dotenv').config();
const KEY = process.env.TMDB_API_KEY;
const fetchAI = require('./openai');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${KEY}`
  }
};

const base_url = `https://api.themoviedb.org/3`

async function movieFinder(prompt) {
  const data = await fetchAI(prompt);
  if (!data.some((el) => el !== 'null') || data.length < 3 || typeof data === 'string') {
    return { key: 'Could not find any movies that match your request. Try changing your prompt.' }
  }

  const inner_base_url = `${base_url}/discover/movie`;
  try {
    const actorID = await personIDFinder(data[1]);
    const directorID = await personIDFinder(data[2]);
    const genreID = await genreIDFinder(data[3]);
    const runtime = data[0] === 'null' ? '' : data[0];

    const response = await fetch(`${inner_base_url}?with_runtime.lte=${runtime}&with_genres=${genreID}&with_people=${actorID},${directorID}`, options);
    const movies = await response.json();
    return movies.results;  
  } catch (error) {
    return error;
  }

}

async function movieFinderByID(ID) {
  const baseURL = `${base_url}/movie/`;
  return fetch(`${baseURL}${ID}`, options)
    .then((movie) => movie.json())
    .catch(err => err);
}

async function genreIDFinder(genreName) {
  if (genreName === 'null') return '';
  if (genreName.toLowerCase() === 'romcom' || genreName.toLowerCase() === 'rom-com') return '10749,35';
  if (genreName === 'sci-fi' || genreName === 'scifi') return '878';

  try {
    const genreResult = await etch(`${base_url}/genre/movie/list`, options);
    for (let genre of genreResult.genres) {
      if (genre.name === genreName) return genre.id;
    }
  } catch (error) {
   return error; 
  }
}

async function personIDFinder(personName) {
  if (personName === 'null') return;
  try {
    const response = await fetch(`${base_url}/search/person?query=${personName}`, options);
    const people = await response.json();
    return people.results[0].id;
  } catch (error) {
    return err;
  }
}



module.exports = { movieFinder, movieFinderByID };