export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: { boxWidth: 20, padding: 10, font: { size: 14 } },
      align: "start",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
          const percentage = ((context.raw / total) * 100).toFixed(1);
          return `${context.label}: ${context.raw} баллов (${percentage}%)`;
        },
      },
    },
  },
};
