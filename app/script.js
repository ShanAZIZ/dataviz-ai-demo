document.getElementById('csvFile').addEventListener('change', generateCharts)

async function generateCharts(event) {
    const file = event.target.files[0]
    const stringData = await file.text();
    const charts = await callOpenAI(prepareStringData(stringData))
    createCharts(charts)
}

function prepareStringData(data) {
    const arrayLines = data.split('\n')
    const first = arrayLines.slice(0, 50)
    return first.join('\n')
}

async function callOpenAI (strData) {
    const response = await fetch("http://localhost:3001", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: strData
        })
    });
    return await response.json()
}

function createCharts(datas) {
    console.log(datas)
    for(const chart of datas) {
        const containerDiv = document.createElement('div')
        containerDiv.className = 'container'
        const title = document.createElement('h3')
        title.innerText = chart.title
        const div = document.createElement('div')
        div.className = 'chart-container'
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        new Chart(ctx, chart.chartjs)
        div.appendChild(canvas)
        containerDiv.appendChild(title)
        containerDiv.appendChild(div)
        document.body.appendChild(containerDiv)
    }
}
