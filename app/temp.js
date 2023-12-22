function calculateAveragePricePerNeighborhood(data) {
    const sums = {}, counts = {}, averages = {};

    data.forEach(row => {
        if (!sums[row.Neighborhood]) {
            sums[row.Neighborhood] = 0;
            counts[row.Neighborhood] = 0;
        }
        sums[row.Neighborhood] += row.Price;
        counts[row.Neighborhood]++;
    });

    for (let neighborhood in sums) {
        averages[neighborhood] = sums[neighborhood] / counts[neighborhood];
    }

    return averages;
}

function createBarChart(data) {
    const averages = calculateAveragePricePerNeighborhood(data);
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(averages),
            datasets: [{
                label: 'Average Price',
                data: Object.values(averages),
                backgroundColor: 'rgba(0, 123, 255, 0.5)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createHistogram(data) {
    // Extract SquareFeet data
    const squareFeetData = data.map(item => item.SquareFeet);

    const ctx = document.getElementById('histogram').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: squareFeetData,
            datasets: [{
                label: 'Square Feet Distribution',
                data: squareFeetData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createScatterPlot(data) {
    // Prepare data for scatter plot (Price vs. SquareFeet)
    const scatterData = data.map(item => ({
        x: item.SquareFeet,
        y: item.Price
    }));

    const ctx = document.getElementById('scatterPlot').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Price vs. Square Feet',
                data: scatterData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }]
        }
    });
}
