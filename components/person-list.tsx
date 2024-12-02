'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { PERSONS_QUERY } from '../src/infrastructure/graphql/queries';
import { LoadingSkeleton } from './loading-skeleton';
import type { PersonFilters } from './person-filters';
import type { Person, PaginatedPersonResponse } from '../src/core/entities/types';
import Link from 'next/link';
import Image from 'next/image';
import { getPersonImage, getAnimalThumbnail } from '../lib/utils';

interface PersonListProps {
  filters: PersonFilters;
}

interface PersonsData {
  persons: PaginatedPersonResponse;
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

const gramsToKg = (grams: number): number => grams / 1000;

const PersonList = ({ filters }: PersonListProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(1);

  const { data, loading, error, fetchMore } = useQuery<PersonsData>(PERSONS_QUERY, {
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
        if (first.isIntersecting && data?.persons.hasMore) {
          currentPage.current += 1;
          fetchMore({
            variables: {
              page: currentPage.current,
            },
            updateQuery: (
              prev: PersonsData,
              { fetchMoreResult }: { fetchMoreResult: PersonsData }
            ) => {
              if (!fetchMoreResult) {
                return prev;
              }

              return {
                persons: {
                  ...fetchMoreResult.persons,
                  items: [...prev.persons.items, ...fetchMoreResult.persons.items],
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
  }, [data?.persons.hasMore, fetchMore]);

  if (loading && !data) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Une erreur est survenue lors du chargement des données.</div>;
  }

  if (!data?.persons.items.length) {
    return <div>Aucun propriétaire trouvé.</div>;
  }

  const filteredPersons = data.persons.items.filter((person: Person) => {
    let matches = true;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      matches =
        matches &&
        (person.firstName.toLowerCase().includes(searchTerm) ||
          person.lastName.toLowerCase().includes(searchTerm) ||
          person.email.toLowerCase().includes(searchTerm));
    }

    if (filters.animalCount) {
      const count = person.animals.length;
      switch (filters.animalCount) {
        case '1':
          matches = matches && count === 1;
          break;
        case '2-3':
          matches = matches && count >= 2 && count <= 3;
          break;
        case '4-5':
          matches = matches && count >= 4 && count <= 5;
          break;
        case '6+':
          matches = matches && count >= 6;
          break;
      }
    }

    if (filters.animalType) {
      matches =
        matches &&
        person.animals.some(
          (animal) => animal.species.toLowerCase() === filters.animalType?.toLowerCase()
        );
    }

    return matches;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersons.map((person: Person) => (
          <Link key={person.id} href={`/persons/${person.id}`}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <Image
                  src={getPersonImage(person.id)}
                  alt={`${person.firstName} ${person.lastName}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {person.firstName} {person.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{person.animals.length} animaux</p>
                  </div>
                </div>
                {person.animals.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Animaux:</h4>
                    <div className="flex flex-wrap gap-2">
                      {person.animals.map((animal) => (
                        <div key={animal.id} className="relative group">
                          <div className="w-10 h-10 relative rounded-full overflow-hidden">
                            <Image
                              src={getAnimalThumbnail(animal.species, animal.id)}
                              alt={animal.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            <p>{animal.name}</p>
                            <p>{speciesTranslations[animal.species] || animal.species}</p>
                            <p>
                              {gramsToKg(animal.weight).toLocaleString('fr-FR', {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1,
                              })}{' '}
                              kg
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    {person.email}
                  </Button>
                  {person.phoneNumber && (
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      {person.phoneNumber}
                    </Button>
                  )}
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
};

export default PersonList;
