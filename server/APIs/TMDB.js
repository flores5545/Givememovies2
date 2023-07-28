const KEY = process.env.TMDB_API_KEY;

// Search for a movie by title


// Get details of movie using id


// Serch actor/director by name


// Get details of movies using actor/director id



// Filters 

function processMovies(movies) {

  // Remove duplicates
  filteredMovies = [...new Set(chars)];

  // Sort by vote average on IMDB
  sortedMovies = filteredMovies.sort((a, b) => b.vote_average - a.vote_average);

  // Return top 20 (less if there are <20)
  return sortedMovies.slice(0, 20);
}