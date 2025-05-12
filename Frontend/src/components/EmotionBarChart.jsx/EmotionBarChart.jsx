import React, { useContext, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Context } from "../../context/Context";

const EmotionBarChart = () => {
  const { emotionData, savedEmotionData } = useContext(Context);

  // Memoize calculations to avoid re-renders
  const chartData = useMemo(() => {
    const current = emotionData?.probabilities || {};
    const existing = savedEmotionData?.textEmotions || {};

    const allKeys = new Set([...Object.keys(current), ...Object.keys(existing)]);
    const averaged = {};
    allKeys.forEach((key) => {
      const currentVal = parseFloat(current[key]) || 0;
      const existingVal = parseFloat(existing[key]) || 0;
      averaged[key] = ((currentVal + existingVal) / 2).toFixed(4);
    });

    return averaged;
  }, [emotionData, savedEmotionData]);

  const hasValidData = emotionData && Object.keys(chartData).length > 0;

  if (!hasValidData) return <p>No emotion data available</p>;

  return (
    <Bar
      data={{
        labels: Object.keys(chartData),
        datasets: [
          {
            label: "Average Emotion Probability",
            data: Object.values(chartData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",     // anger
              "rgba(153, 102, 255, 0.5)",    // disgust
              "rgba(54, 162, 235, 0.5)",     // fear
              "rgba(255, 206, 86, 0.5)",     // joy
              "rgba(201, 203, 207, 0.5)",    // neutral
              "rgba(255, 159, 64, 0.5)",     // sadness
              "rgba(100, 255, 218, 0.5)",    // shame
              "rgba(75, 192, 192, 0.5)",     // surprise
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
          },
        },
      }}
    />
  );
};

export default EmotionBarChart;
