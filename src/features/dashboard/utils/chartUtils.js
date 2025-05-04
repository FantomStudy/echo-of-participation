export const generateChartData = (inputData) => {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#F94144",
    "#F3722C",
    "#F8961E",
    "#F9C74F",
    "#90BE6D",
    "#43AA8B",
    "#4D908E",
    "#577590",
    "#277DA1",
    "#D00000",
    "#FFBA08",
    "#9D4EDD",
    "#7209B7",
    "#3A0CA3",
    "#3F37C9",
    "#4361EE",
    "#4CC9F0",
    "#F72585",
    "#7209B7",
    "#B5179E",
    "#560BAD",
    "#480CA8",
    "#3A86FF",
    "#8338EC",
    "#FF006E",
    "#FB5607",
    "#FFBE0B",
    "#8AC926",
    "#06D6A0",
    "#1B9AAA",
    "#8F2D56",
    "#D81159",
    "#F48C06",
    "#2A9D8F",
    "#264653",
    "#E76F51",
    "#E9C46A",
    "#F4A261",
    "#2A9D8F",
    "#219EBC",
  ];

  const data = inputData.filter((group) => group.totalScore > 0);

  if (!data.length) {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverOffset: 4,
        },
      ],
    };
  }
  return {
    labels: data.map((entity) => entity.name),
    datasets: [
      {
        data: data.map((entity) => entity.totalScore),
        backgroundColor: colors.slice(0, data.length),
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };
};
