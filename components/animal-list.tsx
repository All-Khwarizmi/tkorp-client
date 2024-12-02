'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@apollo/client';
import { ANIMALS_QUERY } from '@/src/infrastructure/graphql/queries';
import { LoadingSkeleton } from './loading-skeleton';
import type { AnimalFilters } from './animal-filters';
import type { Animal } from '@/src/core/entities/types';

interface AnimalListProps {
  filters: AnimalFilters;
}

interface AnimalsData {
  animals: {
    items: Animal[];
    total: number;
    hasMore: boolean;
  };
}

const speciesTranslations: Record<string, string> = {
  Dog: 'Chien',
  Cat: 'Chat',
  Bird: 'Oiseau',
  Rabbit: 'Lapin',
  Hamster: 'Hamster',
  Turtle: 'Tortue',
  Fish: 'Poisson',
};

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

const gramsToKg = (grams: number): number => grams / 1000;

const formatWeight = (grams: number): string => {
  return gramsToKg(grams).toLocaleString('fr-FR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};

export default function AnimalList({ filters }: AnimalListProps) {
  const { data, loading, error } = useQuery<AnimalsData>(ANIMALS_QUERY, {
    variables: {
      page: 1,
      take: 100,
      ...(filters.search && { search: filters.search }),
      ...(filters.sort && {
        orderBy: {
          field: filters.sort.split('_')[0],
          direction: filters.sort.split('_')[1].toUpperCase(),
        },
      }),
    },
  });

  if (loading) return <LoadingSkeleton />;
  if (error) return <div>Une erreur est survenue lors du chargement des données.</div>;
  if (!data?.animals.items.length) return <div>Aucun animal trouvé.</div>;

  // Filter animals based on species, age range, and weight range
  const filteredAnimals = data.animals.items.filter((animal) => {
    let matches = true;

    if (filters.species) {
      matches = matches && animal.species.toLowerCase() === filters.species.toLowerCase();
    }

    if (filters.ageRange) {
      const age = calculateAge(animal.dateOfBirth);
      const [minAge, maxAge] = filters.ageRange.split('-').map(Number);
      if (maxAge) {
        matches = matches && age >= minAge && age <= maxAge;
      } else {
        // Handle "11+" case
        matches = matches && age >= minAge;
      }
    }

    if (filters.weightRange) {
      const [minWeight, maxWeight] = filters.weightRange.split('-').map(Number);
      if (maxWeight) {
        matches = matches && animal.weight >= minWeight && animal.weight <= maxWeight;
      } else {
        // Handle "30001+" case
        matches = matches && animal.weight >= minWeight;
      }
    }

    return matches;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAnimals.map((animal) => (
        <Card
          key={animal.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div
                className="w-16 h-16 rounded-full mr-4 flex items-center justify-center"
                style={{
                  backgroundColor: animal.color ? `#${animal.color}20` : '#f3f4f6',
                  color: animal.color ? `#${animal.color}` : '#6b7280',
                }}
              >
                <span className="text-2xl font-bold">{animal.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{animal.name}</h3>
                <p className="text-sm text-gray-600">
                  {speciesTranslations[animal.species] || animal.species}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>Race: {animal.breed}</p>
              <p>Âge: {calculateAge(animal.dateOfBirth)} ans</p>
              <p>Poids: {formatWeight(animal.weight)} kg</p>
              {animal.color && (
                <div className="flex items-center gap-2">
                  <span>Couleur:</span>
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: `#${animal.color}` }}
                    title={`#${animal.color}`}
                  />
                </div>
              )}
              <p className="text-gray-500 mt-2">
                Propriétaire: {animal.owner.firstName} {animal.owner.lastName}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
