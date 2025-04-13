import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SpeechEmotionBarChart = ({ emotionData }) => {
  if (!emotionData) return <p>Loading...</p>;

  const data = Object.entries(emotionData).map(([emotion, value]) => ({
    name: emotion,
    value: parseFloat(value),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#00bcd4" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SpeechEmotionBarChart;
