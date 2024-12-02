'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useQuery } from '@apollo/client';
import { ANIMALS_QUERY } from '../src/infrastructure/graphql/queries';
import { LoadingSkeleton } from './loading-skeleton';
import type { Animal } from '../src/core/entities/types';

interface AnimalData {
  items: Animal[];
  total: number;
  hasMore: boolean;
}

interface ProcessedData {
  species: string;
  weight: number;
  name: string;
}

const COLORS = {
  Chien: '#8884d8',
  Chat: '#82ca9d',
  Oiseau: '#ffc658',
  Hamster: '#ff7300',
  Lapin: '#0088FE',
  Autre: '#d84315',
};

// Convert weight from grams to kilograms
const gramsToKg = (grams: number): number => grams / 1000;

// Define reasonable weight ranges for different species (in kg)
const WEIGHT_RANGES = {
  Chien: { min: 1, max: 100 },
  Chat: { min: 0.5, max: 15 },
  Oiseau: { min: 0.01, max: 2 },
  Hamster: { min: 0.02, max: 0.2 },
  Lapin: { min: 0.5, max: 10 },
  Autre: { min: 0.01, max: 100 },
};

const isWeightReasonable = (species: string, weightInKg: number): boolean => {
  const range = WEIGHT_RANGES[species as keyof typeof WEIGHT_RANGES] || WEIGHT_RANGES.Autre;
  return weightInKg >= range.min && weightInKg <= range.max;
};

export default function WeightDistribution() {
  const { data, loading } = useQuery<{ animals: AnimalData }>(ANIMALS_QUERY, {
    variables: {
      page: 1,
      take: 1000,
      orderBy: { field: 'weight', direction: 'ASC' },
    },
  });

  if (loading) {
    return <LoadingSkeleton />;
  }

  const processedData: ProcessedData[] =
    data?.animals.items
      .map((animal) => ({
        species: animal.species,
        weight: gramsToKg(animal.weight), // Convert to kg
        name: animal.name,
      }))
      .filter((animal) => isWeightReasonable(animal.species, animal.weight)) || [];

  // Get unique species from the filtered data
  const uniqueSpecies = Array.from(new Set(processedData.map((item) => item.species)));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="font-bold">{data.name}</p>
          <p>Espèce: {data.species}</p>
          <p>Poids: {data.weight.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} kg</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="weight"
          name="Poids"
          unit=" kg"
          label={{ value: 'Poids (kg)', position: 'bottom' }}
        />
        <YAxis
          type="number"
          dataKey="weight"
          label={{ value: 'Poids (kg)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {uniqueSpecies.map((species) => (
          <Scatter
            key={species}
            name={species}
            data={processedData.filter((d) => d.species === species)}
            fill={COLORS[species as keyof typeof COLORS] || COLORS.Autre}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
