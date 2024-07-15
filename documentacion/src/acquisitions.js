import Chart from "chart.js/auto";

(async function () {
  const data = {
    labels: [
      "Coherencia del modelo de negocio",
      "Conocimiento del cliente",
      "Salud financiera",
      "Alineación en la comunicación interna",
      "Conocimiento del negocio",
    ],
    datasets: [
      {
        label: "Resultados",
        data: [2, 1, 2, 2, 3],
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgb(153, 102, 255)",
        pointBackgroundColor: "rgb(153, 102, 255)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(153, 102, 255)",
      },
      {
        label: "Ideal",
        data: [1, 2, 3, 4, 4],
        fill: true,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        pointBackgroundColor: "rgb(255, 159, 64)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 159, 64)",
      },
    ],
  };

  new Chart(document.getElementById("acquisitions"), {
    type: "radar",
    data: data,
    options: {
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.raw;
            },
          },
        },
        title: {
          display: true,
          text: "Radar estratégico organizacional",
          font: {
            size: 18,
          },
        },
      },
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      scale: {
        ticks: {
          beginAtZero: true,
          max: 4,
          stepSize: 1,
          font: {
            size: 14,
          },
        },
      },
      animation: {
        duration: 2000,
        easing: "easeOutBounce",
      },
    },
  });
})();
