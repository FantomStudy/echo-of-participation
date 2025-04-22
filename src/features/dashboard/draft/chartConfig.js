export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: { boxWidth: 20, padding: 10, font: { size: 14 } },
      align: "start",
      display: true,
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.raw} баллов`,
      },
    },
  },
};
