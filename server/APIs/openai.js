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
async function fetchAI(TMDBres){
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: `For a response like the one in between three {}, extract {{{${TMDBres}}}}`,
      max_tokens: 10
    })
  })
  const data = await res.json();
  console.log(data);
  return data;
}
fetchAI()


// Get prompt, extract keywords (Actor/director, max runtime, genre...)
// suggests movies, send name of movies to