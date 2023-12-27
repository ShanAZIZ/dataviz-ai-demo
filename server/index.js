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

const messageContent = (data) => `
You are a data analyst and a chart.js chart generator, you will answer with a following exact format.
With this following data, you will generata a list of logic data charts that explains that will describe the data.
You'll follow the rules of generating good datavisualisations
Your response should be a JSON.

The response format: 
[
  {
    "title": "Example Chart.js Configuration",
    "chartjs": {
      "type": "bar",
      "data": {
        "labels": ["Label1", "Label2", "Label3"],
        "datasets": [{
          "label": "",
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
]

Here is the data :
${data}
`

const generateMessage = (data) => [
  { role: 'user', content: messageContent(data) },
  { role: 'system', content: `
    [
      {
        "title": "Example Chart.js Configuration",
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

app.get('/', async (req, res) => {
  fs.readFile("./collegeeffectifmin.csv", 'utf8', async (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: generateMessage(data),
    })
    res.json(JSON.parse(response.choices[0].message.content))
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

