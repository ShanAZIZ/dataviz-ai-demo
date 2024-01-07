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
app.use(express.json());

/**
 * Cette fonction va generer un prompt pour l'API OPEN AI avec les données envoyés par le navigateur
 * @param {*} data 
 * @returns 
 */
const generatePrompt = (data) => `
You are a data analyst and a chart.js chart generator, you will answer with a following exact format.
With this following data, you will generata a list of logic data charts that explains that will describe the data.
You'll follow the rules of generating good datavisualisations
Your response should be a JSON with double quotes only.
Do not shortcut the data

Here is the data :
${data}
`

/**
 * Cette fonction va appeller recevoir le prompt et generer le format de message attendu par l'api OPEN AI
 * @param {*} data 
 * @returns 
 */
const generateMessage = (prompt) => [
  { role: 'user', content: prompt },
  { role: 'system', content: `
    [
      {
        "title": "Example Chart.js Configuration",
        "description": "A description of what is represented in the data",
        "chartjs": {
          "type": "bar",
          "data": {
            "labels": ["Label1", "Label2", "Label3"],
            "datasets": [{
              "label": "Dataset 1",
              "data": [10, 20, 30],
              "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
              "borderColor": ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
              "borderWidth": 1,
              "hoverBackgroundColor": "rgba(255, 99, 132, 0.4)",
              "hoverBorderColor": "rgba(255, 99, 132, 1)",
              "hoverBorderWidth": 2,
              "stack": "Stack 0"
            }]
          }
        }
      }
    ]`
  },
]

/**
 * Cette route va être appellée par le navigateur
 * Elle va créer un appel vers l'api d'OPEN AI et recuperer le resultat et le renvoyer vers le navigateur
 */
app.post('/', async (req, res) => {
  const prompt = generatePrompt(req.body.data)
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: generateMessage(prompt),
    response_format: {
      type: "json_object"
    }
  })
  res.json(JSON.parse(response.choices[0].message.content))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

