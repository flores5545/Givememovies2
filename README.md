# Givememovies


Give me movies is a website that uses AI, more specifically Natural Language Processing, to suggest movies to users using prompts, according to 4 different criteria: Genre, Actor, Director, and Maximum watchtime. 

The front-end uses React and the Back-end uses Koa and Mongoose, although I did not have time to implement the Database. The prompts from the user are sent to the OpenAI API, which handles the prompt and returns an array of the form [Lenght(in minutes), Actor, Director, Genre]. Then this array is used to fetch movies from the TMDB API. 

To start the webpage, cd into the client and npm start, then try typing something like "I want to watch a rom-com which is less than 2 hours long and with Tom Hanks in it" in the box!



