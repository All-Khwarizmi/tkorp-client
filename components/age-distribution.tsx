'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/client';
import { ANIMALS_QUERY } from '../src/infrastructure/graphql/queries';
import { LoadingSkeleton } from './loading-skeleton';
import type { Animal } from '../src/core/entities/types';

interface AnimalData {
  items: Animal[];
  total: number;
  hasMore: boolean;
}

interface AgeGroup {
  age: string;
  count: number;
}

function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function getAgeGroup(age: number): string {
  if (age < 2) {
    return '0-2';
  }
  if (age < 5) {
    return '3-5';
  }
  if (age < 8) {
    return '6-8';
  }
  if (age < 11) {
    return '9-11';
  }
  return '12+';
}

export default function AgeDistribution() {
  const { data, loading } = useQuery<{ animals: AnimalData }>(ANIMALS_QUERY, {
    variables: {
      page: 1,
      take: 100,
      orderBy: { field: 'dateOfBirth', direction: 'ASC' },
    },
  });

  if (loading) {
    return <LoadingSkeleton />;
  }

  // Calculate age distribution
  const ageGroups = new Map<string, number>();

  data?.animals.items.forEach((animal) => {
    const age = calculateAge(animal.dateOfBirth);
    const group = getAgeGroup(age);
    ageGroups.set(group, (ageGroups.get(group) || 0) + 1);
  });

  // Convert to chart data format and sort by age group
  const chartData: AgeGroup[] = Array.from(ageGroups.entries())
    .map(([age, count]) => ({ age, count }))
    .sort((a, b) => {
      const aStart = parseInt(a.age.split('-')[0]);
      const bStart = parseInt(b.age.split('-')[0]);
      return aStart - bStart;
    });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" label={{ value: 'Âge (années)', position: 'bottom' }} />
        <YAxis label={{ value: "Nombre d'animaux", angle: -90, position: 'insideLeft' }} />
        <Tooltip
          formatter={(value: number) => [`${value} animaux`, 'Nombre']}
          labelFormatter={(label: string) => `Âge: ${label} ans`}
        />
        <Bar dataKey="count" fill="#8884d8" name="Nombre d'animaux" />
      </BarChart>
    </ResponsiveContainer>
  );
}
