document.getElementById('generate-charts').addEventListener('click', generateCharts)

async function generateCharts() {
    const datas = await callOpenAI()
    createCharts(datas)
}

async function callOpenAI () {
    const response = await fetch("http://localhost:3001", {
        method: "GET",
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
