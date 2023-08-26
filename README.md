# Givememovies

**Givememovies** is a website that uses AI, more specifically Natural Language Processing, to suggest movies to users using prompts, according to 4 different criteria: Genre, Actor, Director, and Maximum watchtime. 


## Getting started

For this project, two different API keys were used. Thus, to be able to run the code on your own computer, please first visit https://developer.themoviedb.org/docs/getting-started and https://platform.openai.com/docs/api-reference/ and follow the instructions detailed there. 

To start the server, `cd server`, install dependencies, and run server.js.
To start the webpage, `cd client`, install dependencies, and `npm start`. 
Then, try typing something like "I want to watch a rom-com which is less than 2 hours long and with Tom Hanks in it" in the box!

## Tech stack
The Front End uses React and the Back End uses Koa and Mongoose, although I did not have time to implement the Database. The prompts from the user are sent to the OpenAI API, which handles the prompt and returns an array of the form [Lenght(in minutes), Actor, Director, Genre]. Then this array is used to fetch movies from the TMDB API. 
