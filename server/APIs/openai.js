require('dotenv').config();
const API_KEY = process.env.OPENAI_API_KEY;

async function fetchAI(input) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          'role': 'system',
          'content': 'given an input like: I want to watch a Tom Cruise action movie which is less than 2 hours long, extract the information in the following format: [Lenght in minutes, Actor, Director, Genre] Make sure the first letter is always uppercase. If something is not specified, add it to the list as null. The list should only contain the categories specified in the example provided between [ symbols. Do not add more than one value per category'
        },
        { 'role': 'user', 'content': `${input}` }
      ],
      max_tokens: 20
    })
  })
  let data = await res.json();
  if (data.choices == undefined) {
    return 'Please re-enter your prompt.'
  }
  return data.choices[0].message.content.replace(/[\[\]]/g, '').split(', ');
}

module.exports = fetchAI;




