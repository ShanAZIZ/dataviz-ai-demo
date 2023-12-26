document.getElementById('csvFile').addEventListener('change', readFile)

function readFile(event) {
    const file = event.target.files[0]

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: async function(results) {
            const data = results.data
            const datas = await callOpenAI(data)
            createCharts(datas)
        }
    });
}

async function callOpenAI (data) {
    const response = await fetch("http://localhost:3001", {
        method: "GET",
    });
    return await response.json()
}

function createCharts(datas) {
    console.log(datas)
    for(const chart of datas) {
        const div = document.createElement('div')
        div.className = 'chart-container'
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        new Chart(ctx, chart.chartjs)
        div.appendChild(canvas)
        document.body.appendChild(div)
    }
}
