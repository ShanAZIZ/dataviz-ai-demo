
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
require('dotenv').config()

const API_TOKEN = process.env.API_TOKEN;

app.options('*', cors())


app.get('/', async (req, res) => {
    const data = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        // mode: 'no-cors',
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({
            "model": "gpt-4",
            "messages": [
                {
                    "role": "user",
                    "content": "hello how are you"
                }
            ]
        })
    });
  res.send(await data.json())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
