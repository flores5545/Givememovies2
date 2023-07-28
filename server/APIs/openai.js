/*
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = async() => {
  await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [],
  temperature: 0.5,
  max_tokens: 256,
})
};
*/


API_KEY = process.env.OPENAI_API_KEY
async function fetchAI(TMDBres) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "given an input like: I want to watch a Tom Cruise action movie which is less than 2 hours long, extract the information in the following format: [Lenght(in minutes), Actor, Director, Genre]. If something is not specified, add it to the list as NA. The list should only contain the categories specified in the example provided between [ symbols. Do not add more than one value per category"
        },
        { "role": "user", "content": "I want to watch an action movie with Tom Cruise which is less than 2 hours" }
      ],
      max_tokens: 20
    })
  })
  const data = await res.json();
  console.log(data.choices[0].message.content);
  return data;
}
fetchAI()


// Get prompt, extract keywords (Actor/director, max runtime, genre...)
// suggests movies, send name of movies to

/*
prompt: 'given an input like: I want to watch a Tom Cruise action movie which is less than 2 hours long, extract the information in the following format: [MovieTitle, Lenght, Actor, Director, Genre]. If something is not specified, add it to the list as NA. The list should only contain the categories specified in the example provided between [ symbols. Do not add more than one value per category',
*/