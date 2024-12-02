'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useStatistics } from '../hooks/use-statistics';
import { LoadingSkeleton } from './loading-skeleton';
import type { AnimalSpeciesCount } from '../src/core/entities/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface ChartData {
  name: string;
  value: number;
}

export default function SpeciesDistribution() {
  const { speciesDistribution, isLoading } = useStatistics();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const data: ChartData[] = speciesDistribution.map((item: AnimalSpeciesCount) => ({
    name: item.species,
    value: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry: ChartData, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
