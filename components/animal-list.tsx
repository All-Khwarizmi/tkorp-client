'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from 'components/ui/card';
import { useQuery } from '@apollo/client';
import { ANIMALS_QUERY } from '../src/infrastructure/graphql/queries';
import { LoadingSkeleton } from './loading-skeleton';
import type { AnimalFilters } from './animal-filters';
import type { Animal, PaginatedAnimalResponse } from '../src/core/entities/types';
import Link from 'next/link';
import Image from 'next/image';
import { getAnimalImage } from '../lib/utils';

interface AnimalListProps {
  filters: AnimalFilters;
}

interface AnimalsData {
  animals: PaginatedAnimalResponse;
}

const ITEMS_PER_PAGE = 12;

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
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(1);

  const { data, loading, error, fetchMore } = useQuery<AnimalsData>(ANIMALS_QUERY, {
    variables: {
      page: 1,
      take: ITEMS_PER_PAGE,
      ...(filters.search && { search: filters.search }),
      ...(filters.sort && {
        orderBy: {
          field: filters.sort.split('_')[0],
          direction: filters.sort.split('_')[1].toUpperCase(),
        },
      }),
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && data?.animals.hasMore) {
          currentPage.current += 1;
          fetchMore({
            variables: {
              page: currentPage.current,
            },
            updateQuery: (
              prev: AnimalsData,
              { fetchMoreResult }: { fetchMoreResult: AnimalsData }
            ) => {
              if (!fetchMoreResult) {
                return prev;
              }

              return {
                animals: {
                  ...fetchMoreResult.animals,
                  items: [...prev.animals.items, ...fetchMoreResult.animals.items],
                },
              };
            },
          });
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [data?.animals.hasMore, fetchMore]);

  if (loading && !data) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Une erreur est survenue lors du chargement des données.</div>;
  }

  if (!data?.animals.items.length) {
    return <div>Aucun animal trouvé.</div>;
  }

  // Filter animals based on species, age range, and weight range
  const filteredAnimals = data.animals.items.filter((animal: Animal) => {
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal: Animal) => (
          <Link key={animal.id} href={`/animals/${animal.id}`}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <Image
                  src={getAnimalImage(animal.species, animal.id)}
                  alt={animal.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
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
          </Link>
        ))}
      </div>
      <div ref={loadMoreRef} className="h-10 mt-4">
        {loading && (
          <div className="flex justify-center">
            <LoadingSkeleton />
          </div>
        )}
      </div>
    </>
  );
}
