const getRandomUpTo = (max) => {
  return Math.floor(Math.random() * (max + 1));
};
const paintGraph = ({
  data,
  labels,
  graphId,
  dataKeyArray
}) => {
  const chart = Chart.getChart(graphId);
  if (!chart) {
    const ctx = document.getElementById(graphId).getContext('2d');
    const minValue = Math.min(...dataKeyArray.map((key) => data[key]).flat());
    const maxMin = minValue - 1;
    const min = Math.max(maxMin, 0);
    const datasets = dataKeyArray.map((key) => ({
      label: key.toUpperCase(),
      data: data[key], // dados
      borderWidth: 1,
      fill: false,
      borderColor: `rgb(${ getRandomUpTo(255) }, ${ getRandomUpTo(255) }, ${ getRandomUpTo(255) })`,
      tension: 0.1
    }));

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels, // horas
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: min,
          },
        }
      }
    });
  } else {
    chart.destroy();
    const ctx = document.getElementById(graphId).getContext('2d');
    const minValue = Math.min(...dataKeyArray.map((key) => data[key]).flat());
    console.log(minValue);
    const min = Math.max(minValue - (0.1 * minValue), 0);
    const datasets = dataKeyArray.map((key) => ({
      label: key.toUpperCase(),
      data: data[key], // dados
      borderWidth: 1,
      fill: false,
      borderColor: `rgb(${ getRandomUpTo(255) }, ${ getRandomUpTo(255) }, ${ getRandomUpTo(255) })`,
      tension: 0.1
    }));

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels, // horas
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            // max: Math.max(...data.volume) + 50,
            min: min,
          },
        }
      }
    });
  }
};

// module.exports = paintGraph;
