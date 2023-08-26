# Givememovies

**Givememovies** is a website that uses AI, more specifically Natural Language Processing, to suggest movies to users using prompts, according to 4 different criteria: Genre, Actor, Director, and Maximum watchtime. 

<figure>
    <img alt="Homepage" width="1000vw" src="screenshots/Captura de pantalla 2023-08-26 100609.png"/>
</figure>
<figure>
    <img alt="Suggested movies" width="1000vw" src="screenshots/Captura de pantalla 2023-08-26 100912.png"/>
</figure>
<figure>
    <img alt="Individual movie" width="1000vw" src="screenshots/Captura de pantalla 2023-08-26 101011.png"/>
</figure>

Check a live demo of the project here https://youtu.be/59VW61lYVqA

## Getting started

For this project, two different API keys were used. Thus, to be able to run the code on your own computer, please first visit https://developer.themoviedb.org/docs/getting-started and https://platform.openai.com/docs/api-reference/ and follow the instructions detailed there. 

### Start the server
   ```
   npm i
   ```
   ```
   cd server
   ```
   ```
   node server.js
   ```
You should get the following message: Server is running at http://localhost:3001.
### Start the client
   ```
   cd client
   ```
   ```
   npm i
   ```
   ```
   npm start
   ```
The website will be running at http://localhost:3000 and it should automatically pop up on your browser.
Now, try typing something like "I want to watch a rom-com which is less than 2 hours long and with Tom Hanks in it" in the box!

## Tech stack
The Front End uses React and the Back End uses Koa and Mongoose, although I did not have time to implement the Database. The prompts from the user are sent to the OpenAI API, which handles the prompt and returns an array of the form [Lenght(in minutes), Actor, Director, Genre]. Then this array is used to fetch movies from the TMDB API. 
