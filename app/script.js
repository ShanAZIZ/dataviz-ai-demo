document.getElementById('csvFile').addEventListener('change', readFile);

function readFile(event) {
    const file = event.target.files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: async function(results) {
            const data = results.data;
            const response = await callOpenAI(data);
            console.log(response);
            // console.log(data[0]);
            // createBarChart(data);
            // createHistogram(data);
            // createScatterPlot(data);
        }
    });
}

function callOpenAI (data) {
    return fetch("http://localhost:3001", {
        method: "GET",
    });
}

