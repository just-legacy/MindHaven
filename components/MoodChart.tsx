
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MoodLog } from '../types';

interface MoodChartProps {
  data: MoodLog[];
}

const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const formattedData = data.slice(-30).map(log => ({
    name: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    rating: log.rating,
    mood: log.mood
  }));

  const yAxisTicks = [1, 2, 3, 4, 5];
  const yAxisLabels = ['Anxious', 'Sad', 'Neutral', 'Calm', 'Joyful'];
  
  const yAxisTickFormatter = (tick: number) => yAxisLabels[tick-1] || '';

  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <LineChart
            data={formattedData}
            margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis 
              domain={[0.5, 5.5]} 
              ticks={yAxisTicks} 
              tickFormatter={yAxisTickFormatter}
              stroke="#64748b"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '0.5rem'
              }}
              labelStyle={{ color: '#0369a1', fontWeight: 'bold' }}
              formatter={(value, name, props) => [`${props.payload.mood} (${value})`, 'Mood']}
            />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#0ea5e9" strokeWidth={3} activeDot={{ r: 8 }} name="Mood Rating" />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
