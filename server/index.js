const express = require('express')
const cors = require('cors')
require('dotenv').config()
const fs = require('fs')
const OpenAI = require("openai")
const openai = new OpenAI({
  apiKey: process.env.API_TOKEN,
})


const port = 3001
const app = express()
app.use(cors({
  origin: "*"
}))


const messageContent = `
You are a chart.js chart generator, you will answer with this following exact format :
[
  {
    "title": "",
    "chartjs": {
      "type": "",
      "data": {
        "labels": [],
        "datasets": [{
          "label": "",
          "data": [],
          "backgroundColor": "rgba(0, 123, 255, 0.5)"
        }]
      },
      "options": {}
    }
  }
]

You will of course complete the field with concrete values determined from the given csv.
You may give at list two entry of this type inside the [].
Your response should be a JSON.
`

const message = [
  { role: 'user', content: messageContent },
  { role: 'system', content: `
    [
      {
        "title": "",
        "chartjs": {
          "type": "",
          "data": {
            "labels": [],
            "datasets": [{
              "label": "",
              "data": [],
              "backgroundColor": "rgba(0, 123, 255, 0.5)"
            }]
          },
          "options": {}
        }
      }
    ]`
  }
]


app.get('/', async (req, res) => {
  const filedata = await fs.readFile('input.csv', () => {});

  const blob = new File([new Blob([filedata])], 'input.csv', {
    type: 'application/csv',
  });
  await openai.files.create({ file: blob, purpose: 'assistant' });
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: message,
  })
  res.json(JSON.parse(response.choices[0].message.content))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

