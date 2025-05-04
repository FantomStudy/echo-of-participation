export const chartOptions = {
  responsive: true,
  plugins: {
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
