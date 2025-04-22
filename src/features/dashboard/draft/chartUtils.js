import { getStudentTotalPoints } from "./mainTableUtils";

export const generateChartData = (students, attendance) => {
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

  return {
    labels: students.map((student) => student.name),
    datasets: [
      {
        label: "Общие баллы",
        data: students.map((student) =>
          getStudentTotalPoints(attendance, student.id)
        ),
        backgroundColor: [
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
        ].slice(0, students.length),
        hoverOffset: 4,
      },
    ],
  };
};
