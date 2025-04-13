import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const emotionWeights = {
  joy: 100,
  surprise: 80,
  neutral: 70,
  shame: 30,
  fear: 20,
  disgust: 20,
  anger: 10,
  sad: 5,
};

const WeeklyLineChart = ({ weeklyEmotionData }) => {
  if (!weeklyEmotionData || weeklyEmotionData.length === 0) return <p>Loading...</p>;

  const computeScore = (text, speech) => {
    const allEmotions = new Set([...Object.keys(text), ...Object.keys(speech)]);

    let score = 0;
    let total = 0;

    allEmotions.forEach((emotion) => {
      const val1 = parseFloat(text[emotion]) || 0;
      const val2 = parseFloat(speech[emotion]) || 0;
      const avg = (val1 + val2) / 2;
      const weight = emotionWeights[emotion] || 50;

      score += avg * weight;
      total += avg;
    });

    return total === 0 ? 0 : Math.round(score / total);
  };

  const chartData = weeklyEmotionData.map((dayData) => ({
    day: dayData.day,
    EmotionScore: computeScore(dayData.textEmotion, dayData.speechEmotion),
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} tickCount={6} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="EmotionScore"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyLineChart;
