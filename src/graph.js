const getRandomUpTo = (max) => {
  return Math.floor(Math.random() * (max + 1));
};
const paintGraph = ({
  data,
  labels,
  graphId,
  dataKeyArray
}) => {
  const ctx = document.getElementById(graphId).getContext('2d');
  const datasets = dataKeyArray.map((key) => ({
    label: key.toUpperCase(),
    data: data[key], // dados
    borderWidth: 1,
    fill: false,
    borderColor: `rgb(${getRandomUpTo(255)}, ${getRandomUpTo(255)}, ${getRandomUpTo(255)})`,
    tension: 0.1
  }));

  const min = Math.min(...dataKeyArray.map((key) => data[key]).flat());

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
          min: Math.max(min - 10, 0),
        },
      }
    }
  });
};

module.exports = paintGraph;

// const myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // horas
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3], // dados
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });