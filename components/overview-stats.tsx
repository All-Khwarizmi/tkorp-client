'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrintIcon as Paw, Users, Scale, Calendar } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { ANIMALS_QUERY, PERSONS_QUERY } from '@/src/infrastructure/graphql/queries';
import { LoadingSkeleton } from './loading-skeleton';
import type { Animal, Person } from '@/src/core/entities/types';

interface AnimalData {
  items: Animal[];
  total: number;
  hasMore: boolean;
}

interface PersonData {
  items: Person[];
  total: number;
  hasMore: boolean;
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

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

// Convert weight from grams to kilograms
const gramsToKg = (grams: number): number => grams / 1000;

export default function OverviewStats() {
  const { data: animalsData, loading: animalsLoading } = useQuery<{ animals: AnimalData }>(
    ANIMALS_QUERY,
    {
      variables: {
        page: 1,
        take: 1000, // Increased to get better average calculations
      },
    }
  );

  const { data: personsData, loading: personsLoading } = useQuery<{ persons: PersonData }>(
    PERSONS_QUERY,
    {
      variables: {
        page: 1,
        take: 100,
      },
    }
  );

  if (animalsLoading || personsLoading) {
    return <LoadingSkeleton />;
  }

  const animals = animalsData?.animals.items || [];
  const totalAnimals = animalsData?.animals.total || 0;
  const totalPersons = personsData?.persons.total || 0;

  // Calculate average weight in kilograms
  const averageWeight = animals.length
    ? gramsToKg(animals.reduce((sum, animal) => sum + animal.weight, 0) / animals.length)
    : 0;

  // Calculate average age
  const averageAge = animals.length
    ? animals.reduce((sum, animal) => sum + calculateAge(animal.dateOfBirth), 0) / animals.length
    : 0;

  const stats = [
    {
      title: "Nombre total d'animaux",
      value: formatNumber(totalAnimals),
      icon: Paw,
    },
    {
      title: 'Nombre total de propriétaires',
      value: formatNumber(totalPersons),
      icon: Users,
    },
    {
      title: 'Poids moyen des animaux',
      value: `${formatNumber(Math.round(averageWeight * 10) / 10)} kg`,
      icon: Scale,
    },
    {
      title: 'Âge moyen des animaux',
      value: `${formatNumber(Math.round(averageAge * 10) / 10)} ans`,
      icon: Calendar,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
