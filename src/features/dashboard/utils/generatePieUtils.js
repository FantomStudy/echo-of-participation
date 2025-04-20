const generateChartData = useMemo(() => {
  if (!students.length || !Object.keys(attendance).length) {
    return {
      labels: [],
      datasets: [
        {
          label: "Общие баллы",
          data: [],
          backgroundColor: [],
          hoverOffset: 4,
        },
      ],
    };
  }

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

  if (filterType === "students") {
    const groupPoints = students.reduce((acc, student) => {
      const group = student.groupName || "Без группы";
      const points = getStudentTotalPoints(student.id);
      acc[group] = (acc[group] || 0) + points;
      return acc;
    }, {});

    if (Object.keys(groupPoints).length === 1 && groupPoints["Без группы"]) {
      return {
        labels: students.map((student) => student.name),
        datasets: [
          {
            label: "Общие баллы",
            data: students.map((student) => getStudentTotalPoints(student.id)),
            backgroundColor: colors.slice(0, students.length),
            hoverOffset: 4,
          },
        ],
      };
    }

    const labels = Object.keys(groupPoints);
    const data = Object.values(groupPoints);

    return {
      labels,
      datasets: [
        {
          label: "Общие баллы по группам",
          data,
          backgroundColor: colors.slice(0, labels.length),
          hoverOffset: 4,
        },
      ],
    };
  }

  return {
    labels: students.map((student) => student.name),
    datasets: [
      {
        label: "Общие баллы",
        data: students.map((student) => getStudentTotalPoints(student.id)),
        backgroundColor: colors.slice(0, students.length),
        hoverOffset: 4,
      },
    ],
  };
}, [students, attendance, filterType]);
