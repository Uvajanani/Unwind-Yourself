

import React from "react";
import { Bar } from "react-chartjs-2";

const EmotionBarChart = () => {
  const emotionData = {
    happy: 0.85,
    sad: 0.1,
    angry: 0.05,
  };

  return (
    <>
      <p>Happy Value: {emotionData.happy}</p>
      <Bar
        data={{
          labels: Object.keys(emotionData),
          datasets: [
            {
              label: "Emotion Probability",
              data: Object.values(emotionData),
              backgroundColor: [
                "rgba(255, 206, 86, 0.5)", 
                "rgba(54, 162, 235, 0.5)", 
                "rgba(255, 99, 132, 0.5)",
              ],
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </>
  );
};

export default EmotionBarChart;
